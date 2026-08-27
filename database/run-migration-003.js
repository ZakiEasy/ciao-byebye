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

const migrationSql = fs.readFileSync(path.join(__dirname, 'migrations/003_pricing_tiers_and_verticals.sql'), 'utf8');

async function run() {
  try {
    await client.connect();
    console.log('[MIGRATION 003] Connecté à Supabase PostgreSQL...');
    await client.query(migrationSql);
    console.log('[MIGRATION 003] Migration 003 (Offres Essentiel/Pro/Multi-sites & Modules) appliquée avec succès !');
  } catch (err) {
    console.error('[MIGRATION 003] Erreur :', err);
  } finally {
    await client.end();
  }
}

run();
