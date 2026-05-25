const { Client } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const ADMIN_URL =
  process.env.DATABASE_ADMIN_URL ||
  'postgres://postgres:root@localhost:5432/postgres';

const databases = [
  'auth_db',
  'vehicles_db',
  'traffic_db',
  'incidents_db',
  'notifications_db',
];

async function ensureDatabase(dbName) {
  const client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  try {
    const { rows } = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName],
    );
    if (rows.length === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created`);
    }
  } finally {
    await client.end();
  }
}

async function main() {
  for (const dbName of databases) {
    await ensureDatabase(dbName);
  }
}

main().catch((err) => {
  console.error('Failed to ensure database:', err.message);
  process.exit(1);
});
