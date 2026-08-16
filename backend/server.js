require('dotenv').config();
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
const isLocalhost = (process.env.DATABASE_URL || '').includes('localhost') || (process.env.DATABASE_URL || '').includes('127.0.0.1');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocalhost ? false : { rejectUnauthorized: false }
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

// 4. Créer une commande de test (Simulée) directe
app.post('/api/orders/mock-create', async (req, res) => {
  const { tableNumber, clientName, items } = req.body;
  
  try {
    const tableResult = await pool.query('SELECT id FROM tables WHERE number = $1', [tableNumber]);
    if (tableResult.rows.length === 0) {
      return res.status(404).json({ error: 'Table non trouvée' });
    }
    const tableId = tableResult.rows[0].id;
    
    let sessionResult = await pool.query('SELECT id FROM table_sessions WHERE table_id = $1 AND status = $2', [tableId, 'active']);
    let sessionId;
    if (sessionResult.rows.length === 0) {
      const newSession = await pool.query(
        'INSERT INTO table_sessions (table_id, status) VALUES ($1, $2) RETURNING id',
        [tableId, 'active']
      );
      sessionId = newSession.rows[0].id;
    } else {
      sessionId = sessionResult.rows[0].id;
    }
    
    const priceSumCents = items.reduce((sum, item) => sum + Math.round(item.price * 100 * item.quantity), 0);
    const orderResult = await pool.query(
      `INSERT INTO orders (session_id, total_amount_cents, payment_status, order_status, client_name)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [sessionId, priceSumCents, 'complete', 'en_cuisine', clientName]
    );
    const orderId = orderResult.rows[0].id;
    
    for (const item of items) {
      const prodResult = await pool.query('SELECT id FROM products WHERE name = $1', [item.name]);
      if (prodResult.rows.length > 0) {
        const productId = prodResult.rows[0].id;
        await pool.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents)
           VALUES ($1, $2, $3, $4)`,
          [orderId, productId, item.quantity, Math.round(item.price * 100)]
        );
      }
    }
    
    const queueResult = await pool.query("SELECT COUNT(*) as count FROM orders WHERE order_status = 'en_cuisine'");
    const queuePos = parseInt(queueResult.rows[0].count || 1);

    io.emit('new_order', {
      orderId,
      tableNumber,
      clientName,
      items,
      queuePos,
      message: `Nouvelle commande de ${clientName} (Table ${tableNumber})`
    });
    
    res.json({ success: true, orderId, queuePos });
  } catch (error) {
    console.error('Erreur mock order create:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 5. Récupérer toutes les commandes actives filtrées par rôle
app.get('/api/orders', async (req, res) => {
  const { email } = req.query;
  let userRole = 'cuisine'; // par défaut
  let assignedTables = [];

  if (email) {
    try {
      const userRes = await pool.query('SELECT role, assigned_tables FROM staff_users WHERE email = $1', [email]);
      if (userRes.rows.length > 0) {
        userRole = userRes.rows[0].role;
        assignedTables = userRes.rows[0].assigned_tables || [];
      }
    } catch (e) {
      console.error('Erreur récupération rôle utilisateur:', e);
    }
  }

  try {
    let queryText = `
      SELECT o.id, o.client_name, o.order_status, o.payment_status, o.created_at, t.number as table_number,
             COALESCE(
               json_agg(
                 json_build_object(
                   'name', p.name,
                   'quantity', oi.quantity,
                   'price', oi.unit_price_cents / 100.0,
                   'category', p.category
                 )
               ) FILTER (WHERE p.name IS NOT NULL ${userRole === 'bar' ? "AND p.category = 'boisson'" : ""}),
               '[]'
             ) as items
      FROM orders o
      JOIN table_sessions ts ON o.session_id = ts.id
      JOIN tables t ON ts.table_id = t.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.order_status IN ('en_cuisine', 'prete')
    `;

    const queryParams = [];

    if (userRole === 'serveur') {
      queryParams.push(assignedTables);
      queryText += ` AND t.number = ANY($${queryParams.length})`;
    }

    queryText += `
      GROUP BY o.id, t.number
      ORDER BY o.created_at ASC
    `;

    const result = await pool.query(queryText, queryParams);
    let rows = result.rows;

    if (userRole === 'bar') {
      rows = rows.filter(order => order.items && order.items.length > 0);
    }

    res.json(rows);
  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 6. Mettre à jour le statut d'une commande
app.patch('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING id',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    
    io.emit('order_status_updated', { orderId: id, status });
    
    res.json({ success: true, status });
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 6.1. Récupérer la liste du personnel (serveurs) pour affectation
app.get('/api/staff', async (req, res) => {
  try {
    const result = await pool.query("SELECT email, role, assigned_tables FROM staff_users WHERE role = 'serveur' ORDER BY email");
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération personnel:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 6.2. Affecter des tables à un serveur
app.post('/api/staff/assign-tables', async (req, res) => {
  const { email, tables } = req.body;
  if (!email || !Array.isArray(tables)) {
    return res.status(400).json({ error: 'Paramètres invalides' });
  }
  try {
    await pool.query('UPDATE staff_users SET assigned_tables = $1 WHERE email = $2', [tables, email]);
    io.emit('tables_assigned', { email, tables });
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur affectation tables:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 6.3. Récupérer tout le menu (pour l'activation/désactivation en cuisine)
app.get('/api/menu/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, category, is_available FROM products ORDER BY category, name');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération tout le menu:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 6.4. Modifier la disponibilité d'un produit du menu
app.patch('/api/menu/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { is_available } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET is_available = $1 WHERE id = $2 RETURNING id, name, is_available',
      [is_available, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    io.emit('menu_updated');
    res.json({ success: true, product: result.rows[0] });
  } catch (error) {
    console.error('Erreur mise à jour dispo produit:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 7. Endpoint SSO Callback pour le portail cuisine / pro
// 7. Endpoint SSO Callback pour le portail cuisine / pro
app.get('/api/auth/sso/callback', async (req, res) => {
  const { provider, state, email } = req.query;
  
  if (!provider) {
    return res.status(400).send('SSO Provider manquant');
  }

  // Choix de l'email par défaut selon le provider si non fourni
  let loginEmail = email;
  if (!loginEmail) {
    if (provider === 'google') loginEmail = 'chef@atelier-chris.fr';
    else if (provider === 'apple') loginEmail = 'maitre@atelier-chris.fr';
    else if (provider === 'microsoft') loginEmail = 'david@atelier-chris.fr';
    else loginEmail = 'boss@atelier-chris.fr';
  }

  console.log(`[SSO AUTH] Authentification réussie via ${provider} pour ${loginEmail} (state: ${state})`);

  try {
    const userRes = await pool.query('SELECT role, assigned_tables FROM staff_users WHERE email = $1', [loginEmail]);
    if (userRes.rows.length === 0) {
      return res.status(401).send(`Utilisateur non autorisé: ${loginEmail}`);
    }
    const staff = userRes.rows[0];

    // Renvoyer un script pour enregistrer la session d'authentification et rediriger vers le dashboard
    res.send(`
      <script>
        sessionStorage.setItem('ciao_byebye_auth', 'true');
        sessionStorage.setItem('ciao_byebye_user', '${loginEmail}');
        sessionStorage.setItem('ciao_byebye_role', '${staff.role}');
        sessionStorage.setItem('ciao_byebye_tables', JSON.stringify(${JSON.stringify(staff.assigned_tables)}));
        window.location.href = '/dashboard.html';
      </script>
    `);
  } catch (error) {
    console.error('Erreur SSO Callback DB:', error);
    res.status(500).send('Erreur d\'authentification');
  }
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
  console.log(`Serveur Ciao Byebye démarré sur le port ${PORT}`);
});
