const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = "postgresql://ciao_byebye_test_user:hpjcegU1VNtzRdXlzhCxptu7hBYpNhBm@dpg-da04ku8u01pc738dbnpg-a.frankfurt-postgres.render.com/ciao_byebye_test";

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

async function run() {
  try {
    await client.connect();
    console.log('Connected to DB');
    await client.query(schema);
    console.log('Schema executed successfully!');
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

run();
