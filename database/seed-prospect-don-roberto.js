// Script de provisionnement du prospect Don Roberto Nice
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ciao_byebye_db',
});

async function seedDonRobertoProspect() {
  console.log('--- Provisionnement du Prospect & Démo Don Roberto Nice ---');

  try {
    // 1. Enregistrement dans le CRM Commercial (crm_leads)
    const leadCheck = await pool.query("SELECT id FROM crm_leads WHERE business_name ILIKE '%Don Roberto%'");
    let leadId;
    
    if (leadCheck.rows.length === 0) {
      const leadRes = await pool.query(`
        INSERT INTO crm_leads (
          business_name, activity_type, city, address, postal_code, lat, lng,
          estimated_revenue_eur, estimated_covers, footfall_level, current_pos_solution,
          web_rating, web_reviews_count, customer_complaints, sales_pitch_hook,
          lead_status, contact_name, contact_phone, contact_email, notes
        ) VALUES (
          'Don Roberto Pizzeria Trattoria',
          'pizzeria',
          'Nice',
          '158 Avenue de la Californie',
          '06200',
          43.6841,
          7.2345,
          340000,
          50,
          'eleve',
          'Site Wix + Commandes UberEats/Deliveroo (25% à 30% commission)',
          4.7,
          431,
          'Frais de commission élevés sur la livraison, attente aux heures de rush du soir, besoin de fidéliser la clientèle locale de la Californie',
          'Supprimez les 30% de commission des plateformes grâce à la commande QR code directe à table et à emporter, avec programme de fidélité Pro intégré.',
          'rdv_demo',
          'Erik Shaldjyan',
          '04 83 93 60 40',
          'erik@donrobertonice.com',
          'SARL DON ROBERTO - SIREN 883 157 273 - SIRET 883 157 273 00011 - TVA FR57883157273 - APE 5610C - 11 tables 4P + 1 comptoir 6P (50 places)'
        ) RETURNING id
      `);
      leadId = leadRes.rows[0].id;
      console.log('✅ Lead CRM créé pour Don Roberto Nice :', leadId);
    } else {
      leadId = leadCheck.rows[0].id;
      await pool.query(`
        UPDATE crm_leads SET 
          estimated_revenue_eur = 340000,
          estimated_covers = 50,
          notes = 'SARL DON ROBERTO - SIREN 883 157 273 - SIRET 883 157 273 00011 - TVA FR57883157273 - APE 5610C - 11 tables 4P + 1 comptoir 6P (50 places)'
        WHERE id = $1
      `, [leadId]);
      console.log('ℹ️ Lead CRM mis à jour :', leadId);
    }

    // 2. Provisionnement du Déploiement Client Démo (client_deployments)
    const depCheck = await pool.query("SELECT id FROM client_deployments WHERE subdomain = 'don-roberto'");
    if (depCheck.rows.length === 0) {
      await pool.query(`
        INSERT INTO client_deployments (
          restaurant_name, subdomain, custom_domain, infra_status, plan_tier,
          vertical_preset, subscription_status, monthly_fee_cents,
          contact_email, contact_phone, notes
        ) VALUES (
          'Don Roberto Pizzeria Trattoria',
          'don-roberto',
          'www.donrobertonice.com',
          'active',
          'pro',
          'pizzeria',
          'trial',
          9900,
          'erik@donrobertonice.com',
          '04 83 93 60 40',
          'Démo personnalisée active avec 12 tables (50 places), menu pizza artisanale et programme fidélité Pro'
        )
      `);
      console.log('✅ Déploiement démo provisionné : https://don-roberto.ciao-byebye.fr');
    }

    // 3. Création des 12 Tables physiques (11 tables 4P assises + 1 table comptoir 6P)
    const donRobertoTables = [
      { number: '01', name: 'Table 01', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 60, pos_y: 60 },
      { number: '02', name: 'Table 02', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 180, pos_y: 60 },
      { number: '03', name: 'Table 03', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 300, pos_y: 60 },
      { number: '04', name: 'Table 04', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 420, pos_y: 60 },
      { number: '05', name: 'Table 05', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 60, pos_y: 180 },
      { number: '06', name: 'Table 06', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 180, pos_y: 180 },
      { number: '07', name: 'Table 07', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 300, pos_y: 180 },
      { number: '08', name: 'Table 08', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 420, pos_y: 180 },
      { number: '09', name: 'Table 09', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 60, pos_y: 300 },
      { number: '10', name: 'Table 10', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 180, pos_y: 300 },
      { number: '11', name: 'Table 11', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 300, pos_y: 300 },
      { number: '12', name: 'Comptoir Bar 6P', max_covers: 6, zone: 'comptoir', shape: 'bar', pos_x: 420, pos_y: 300 }
    ];

    for (const t of donRobertoTables) {
      const token = `token_donroberto_table_${t.number}`;
      await pool.query(`
        INSERT INTO tables (number, name, max_covers, actual_covers, qr_code_token, service_status, zone, shape, pos_x, pos_y)
        VALUES ($1, $2, $3, 0, $4, 'libre', $5, $6, $7, $8)
        ON CONFLICT (qr_code_token) DO UPDATE SET 
          name = EXCLUDED.name,
          number = EXCLUDED.number,
          max_covers = EXCLUDED.max_covers,
          zone = EXCLUDED.zone,
          shape = EXCLUDED.shape,
          pos_x = EXCLUDED.pos_x,
          pos_y = EXCLUDED.pos_y
      `, [t.number, t.name, t.max_covers, token, t.zone, t.shape, t.pos_x, t.pos_y]);
    }
    console.log('✅ 12 tables créées (11 tables assises 4P + 1 table comptoir 6P = 50 couverts)');

    // 4. Création des 4 comptes d'accès opérationnels
    const allTableNumbers = donRobertoTables.map(t => t.number);
    const staffAccounts = [
      { email: 'gerant.donroberto@ciao-byebye.fr', role: 'gestionnaire', tables: [] },
      { email: 'serveur.donroberto@ciao-byebye.fr', role: 'serveur', tables: allTableNumbers },
      { email: 'cuisine.donroberto@ciao-byebye.fr', role: 'cuisine', tables: [] },
      { email: 'comptoir.donroberto@ciao-byebye.fr', role: 'technique', tables: [] }
    ];

    for (const acc of staffAccounts) {
      await pool.query(`
        INSERT INTO staff_users (email, role, assigned_tables)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, assigned_tables = EXCLUDED.assigned_tables
      `, [acc.email, acc.role, acc.tables]);
      console.log(`✅ Compte créé : ${acc.email} (${acc.role})`);
    }

    // 5. Insertion du Menu Don Roberto
    const donRobertoPizzas = [
      {
        name: 'Pizza Regina Don Roberto',
        description: 'Sauce tomate San Marzano, mozzarella Fior di Latte fondante, jambon blanc supérieur, champignons frais de Paris, origan sauvage.',
        price_cents: 1250,
        category: 'plat',
        image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Pizza Margherita di Bufala',
        description: 'Sauce tomate italienne mijotée, Mozzarella di Bufala Campana AOP crémeuse, basilic frais, filet d\'huile d\'olive extra vierge.',
        price_cents: 1100,
        category: 'plat',
        image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Pizza Burratina Fresca',
        description: 'Sauce tomate, cœur de Burrata crémeuse des Pouilles, roquette sauvage, tomates cerises confites, réduction de balsamique de Modène.',
        price_cents: 1450,
        category: 'plat',
        image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Pizza Calzone Tradizionale',
        description: 'Chausson doré au four à pierre : Mozzarella, jambon blanc, ricotta douce, œuf bio coulant, coulis de tomate San Marzano.',
        price_cents: 1300,
        category: 'plat',
        image_url: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Pizza Tartufata & Champignons',
        description: 'Crème de truffe d\'Alba, mozzarella Fior di Latte, champignons de Paris poêlés, copeaux de Parmigiano Reggiano 24 mois.',
        price_cents: 1550,
        category: 'plat',
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Tiramisu Maison Tradizionale',
        description: 'Biscuits Savoiardi imbibés d\'espresso Illy, crème mascarpone onctueuse, saupoudré de cacao amer pur Équateur.',
        price_cents: 650,
        category: 'dessert',
        image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Spritz Italien Aperol',
        description: 'Prosecco DOC italien, liqueur Aperol, eau pétillante, tranche d\'orange fraîche et olive.',
        price_cents: 800,
        category: 'boisson',
        image_url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=400'
      }
    ];

    for (const p of donRobertoPizzas) {
      await pool.query(`
        INSERT INTO products (name, description, price_cents, category, image_url)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (name) DO UPDATE SET 
          description = EXCLUDED.description,
          price_cents = EXCLUDED.price_cents,
          category = EXCLUDED.category,
          image_url = EXCLUDED.image_url
      `, [p.name, p.description, p.price_cents, p.category, p.image_url]);
    }
    console.log(`✅ ${donRobertoPizzas.length} plats et pizzas Don Roberto insérés au menu !`);

    console.log('--- Fin du provisionnement Don Roberto Nice avec succès ---');
  } catch (err) {
    console.error('❌ Erreur seeding Don Roberto:', err);
  } finally {
    await pool.end();
  }
}

seedDonRobertoProspect();
