const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
const client = new Client({
  connectionString: connectionString,
  ssl: isLocalhost ? false : { rejectUnauthorized: false }
});

const migrationSql = fs.readFileSync(path.join(__dirname, 'migrations/007_loyalty_module_pro_tier.sql'), 'utf8');

async function run() {
  try {
    await client.connect();
    console.log('[MIGRATION 007] Connecté à PostgreSQL...');
    await client.query(migrationSql);
    console.log('[MIGRATION 007] Migration 007 (Module Fidélité Pro 99€) appliquée avec succès !');
  } catch (err) {
    console.error('[MIGRATION 007] Erreur :', err);
  } finally {
    await client.end();
  }
}

run();
