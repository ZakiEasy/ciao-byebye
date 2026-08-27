const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

async function run() {
  console.log('🚀 Exécution de la Migration 002 sur Supabase...\n');
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('📡 Connecté à la base de données Supabase.');

    const sql = fs.readFileSync(path.join(__dirname, 'migrations/002_kds_floorplan_stock_modules.sql'), 'utf8');
    await client.query(sql);
    console.log('✅ Migration 002 appliquée avec succès !');

    // Audit rapide des nouvelles tables et tables enrichies
    const tablesRes = await client.query(`
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
    `);
    console.log('\n📊 Tables disponibles dans Supabase :', tablesRes.rows.map(r => r.table_name));

    const modulesRes = await client.query('SELECT id, name, tier, is_enabled FROM restaurant_modules');
    console.log(`\n🧩 Modules configurés (${modulesRes.rows.length}) :`);
    modulesRes.rows.forEach(m => console.log(`  - [${m.tier.toUpperCase()}] ${m.name} : ${m.is_enabled ? 'Activé' : 'Désactivé'}`));

    const ingredientsRes = await client.query('SELECT count(*) FROM ingredients');
    const bomRes = await client.query('SELECT count(*) FROM product_ingredients');
    console.log(`\n📦 Ingrédients enregistrés : ${ingredientsRes.rows[0].count}`);
    console.log(`🧾 Fiches techniques (BOM) : ${bomRes.rows[0].count}`);

  } catch (err) {
    console.error('❌ Erreur lors de la migration 002 :', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
