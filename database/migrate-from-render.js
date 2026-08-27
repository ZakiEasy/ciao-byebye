const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const RENDER_DB_URL = process.env.RENDER_DATABASE_URL || process.env.DATABASE_URL;
const SUPABASE_URL = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

const tablesInOrder = [
  'tables',
  'products',
  'staff_users',
  'table_sessions',
  'orders',
  'order_items'
];

async function migrate() {
  console.log('🚀 Début de la migration Render -> Supabase...\n');

  const sourceClient = new Client({
    connectionString: RENDER_URL,
    ssl: { rejectUnauthorized: false }
  });

  const targetClient = new Client({
    connectionString: SUPABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('📡 Connexion à la base source (Render)...');
    await sourceClient.connect();
    console.log('✅ Connecté à Render.');

    console.log('📡 Connexion à la base cible (Supabase)...');
    await targetClient.connect();
    console.log('✅ Connecté à Supabase.\n');

    // 1. Appliquer le schéma de structure sur Supabase
    console.log('📝 Application du schéma DDL sur Supabase...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    
    // On retire les inserts de démonstration pour n'importer que les données réelles de Render
    const ddlWithoutSeeds = schemaSql.split('-- 6. Insertion de données de démonstration')[0];
    await targetClient.query(ddlWithoutSeeds);
    console.log('✅ Schéma DDL créé sur Supabase.\n');

    // 2. Migration des données table par table
    for (const tableName of tablesInOrder) {
      console.log(`📦 Migration de la table [${tableName}]...`);
      
      const srcRowsRes = await sourceClient.query(`SELECT * FROM "${tableName}"`);
      const rows = srcRowsRes.rows;
      console.log(`   Trouvé ${rows.length} lignes dans Render.`);

      if (rows.length > 0) {
        const columns = Object.keys(rows[0]);
        const colNames = columns.map(c => `"${c}"`).join(', ');

        for (const row of rows) {
          const values = columns.map(c => row[c]);
          const placeholders = values.map((_, idx) => `$${idx + 1}`).join(', ');

          const updateClauses = columns
            .filter(c => c !== 'id')
            .map(c => `"${c}" = EXCLUDED."${c}"`)
            .join(', ');

          const insertSql = updateClauses.length > 0
            ? `INSERT INTO "${tableName}" (${colNames}) VALUES (${placeholders}) ON CONFLICT (id) DO UPDATE SET ${updateClauses}`
            : `INSERT INTO "${tableName}" (${colNames}) VALUES (${placeholders}) ON CONFLICT (id) DO NOTHING`;

          await targetClient.query(insertSql, values);
        }
      }
      console.log(`   ✅ ${rows.length} lignes migrées dans [${tableName}].\n`);
    }

    // 3. Validation et comparaison
    console.log('🔍 Validation des données après migration :');
    console.log('-------------------------------------------');
    let allMatches = true;
    for (const tableName of tablesInOrder) {
      const srcCountRes = await sourceClient.query(`SELECT count(*) FROM "${tableName}"`);
      const tgtCountRes = await targetClient.query(`SELECT count(*) FROM "${tableName}"`);
      const srcCount = parseInt(srcCountRes.rows[0].count, 10);
      const tgtCount = parseInt(tgtCountRes.rows[0].count, 10);

      const status = srcCount === tgtCount ? '✅ OK' : '❌ DIFFÉRENCE';
      if (srcCount !== tgtCount) allMatches = false;
      console.log(`Table ${tableName.padEnd(16)} : Render = ${srcCount} | Supabase = ${tgtCount} -> ${status}`);
    }
    console.log('-------------------------------------------');

    if (allMatches) {
      console.log('\n🎉 Migration terminée avec succès ! 100% des données ont été transférées.');
    } else {
      console.warn('\n⚠️ Attention : Des écarts ont été détectés.');
    }

  } catch (err) {
    console.error('❌ Erreur lors de la migration :', err);
    process.exit(1);
  } finally {
    await sourceClient.end();
    await targetClient.end();
  }
}

migrate();
