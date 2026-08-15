const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Pool } = require('pg');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // À restreindre en production
  }
});

// Connexion à la base de données PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Servir les fichiers statiques du dossier frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// 1. Récupérer le menu du restaurant
app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE is_available = TRUE ORDER BY category, name');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération du menu:', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

// 2. Création de l'intention de paiement Stripe
app.post('/api/orders/create-payment-intent', async (req, res) => {
  const { session_id, items, client_name } = req.body;

  try {
    // Calculer le total à partir des prix réels en base de données pour éviter la falsification côté client
    let totalAmountCents = 0;
    const itemsDetails = [];

    for (const item of items) {
      const productResult = await pool.query('SELECT price_cents FROM products WHERE id = $1', [item.product_id]);
      if (productResult.rows.length === 0) {
        return res.status(400).json({ error: `Produit non trouvé : ${item.product_id}` });
      }
      const unitPrice = productResult.rows[0].price_cents;
      totalAmountCents += unitPrice * item.quantity;
      itemsDetails.push({ ...item, unit_price_cents: unitPrice });
    }

    // Créer le PaymentIntent sur Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountCents,
      currency: 'eur',
      metadata: { session_id, client_name },
    });

    // Enregistrer la commande en statut 'en_attente'
    const orderResult = await pool.query(
      `INSERT INTO orders (session_id, client_name, payment_intent_id, payment_status, total_amount_cents, order_status)
       VALUES ($1, $2, $3, 'en_attente', $4, 'recu') RETURNING id`,
      [session_id, client_name, paymentIntent.id, totalAmountCents]
    );
    const orderId = orderResult.rows[0].id;

    // Insérer les lignes de la commande
    for (const detail of itemsDetails) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents, customization_notes)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, detail.product_id, detail.quantity, detail.unit_price_cents, detail.customization_notes]
      );
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.error('Erreur de création de paiement:', error);
    res.status(500).json({ error: 'Erreur de paiement' });
  }
});

// 2.5. Récupérer l'état de la table pour l'affichage de la table digitale (nom client, détails, statut paiement)
app.get('/api/tables/:qr_token/display', async (req, res) => {
  const { qr_token } = req.params;

  try {
    // Trouver la table correspondante
    const tableResult = await pool.query('SELECT id, number FROM tables WHERE qr_code_token = $1', [qr_token]);
    if (tableResult.rows.length === 0) {
      return res.status(404).json({ error: 'Table non trouvée' });
    }
    const table = tableResult.rows[0];

    // Trouver la session active de cette table
    const sessionResult = await pool.query(
      "SELECT id FROM table_sessions WHERE table_id = $1 AND status = 'active' ORDER BY started_at DESC LIMIT 1",
      [table.id]
    );

    if (sessionResult.rows.length === 0) {
      return res.json({
        tableNumber: table.number,
        activeSession: false,
        message: 'Aucune session active à cette table'
      });
    }
    const session = sessionResult.rows[0];

    // Récupérer toutes les commandes payées ou en attente associées à cette session
    const ordersResult = await pool.query(
      `SELECT id, client_name, payment_status, order_status, total_amount_cents, created_at
       FROM orders
       WHERE session_id = $1
       ORDER BY created_at ASC`,
      [session.id]
    );

    const orders = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        `SELECT oi.quantity, oi.unit_price_cents, oi.customization_notes, p.name as product_name
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      orders.push({
        id: order.id,
        clientName: order.client_name || 'Client Anonyme',
        paymentStatus: order.payment_status,
        orderStatus: order.order_status,
        totalAmountCents: order.total_amount_cents,
        createdAt: order.created_at,
        items: itemsResult.rows
      });
    }

    res.json({
      tableNumber: table.number,
      sessionId: session.id,
      activeSession: true,
      orders
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des infos d\'affichage table:', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

// 3. Webhook Stripe pour confirmer le paiement
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Erreur webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Traiter le paiement réussi
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    try {
      // Mettre à jour le statut de la commande en base de données
      const result = await pool.query(
        `UPDATE orders 
         SET payment_status = 'paye', order_status = 'en_preparation', updated_at = CURRENT_TIMESTAMP
         WHERE payment_intent_id = $1 RETURNING id, session_id`,
        [paymentIntentId]
      );

      if (result.rows.length > 0) {
        const order = result.rows[0];
        
        // Récupérer le numéro de table pour la notification
        const tableResult = await pool.query(
          `SELECT t.number FROM tables t
           JOIN table_sessions ts ON ts.table_id = t.id
           WHERE ts.id = $1`,
          [order.session_id]
        );
        const tableNumber = tableResult.rows[0]?.number || 'Inconnue';

        // Émettre un événement WebSocket en temps réel à la cuisine (KDS) et à la caisse (POS)
        io.emit('new_order', {
          orderId: order.id,
          tableNumber,
          message: `Nouvelle commande payée pour la table ${tableNumber}`,
        });

        console.log(`Commande ${order.id} payée et envoyée en cuisine.`);
      }
    } catch (dbError) {
      console.error('Erreur mise à jour base de données post-paiement:', dbError);
      return res.status(500).send('Database Error');
    }
  }

  res.json({ received: true });
});

// Connexion WebSocket pour le suivi en temps réel
io.on('connection', (socket) => {
  console.log('Client connecté aux mises à jour temps réel:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client déconnecté:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur KZ Menu démarré sur le port ${PORT}`);
});
