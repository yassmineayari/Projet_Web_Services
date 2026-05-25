const { Client } = require('pg');
const { execSync } = require('child_process');
const path = require('path');

require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const ADMIN_URL =
  process.env.DATABASE_ADMIN_URL ||
  'postgres://postgres:root@localhost:5432/postgres';

const databases = [
  {
    name: 'auth_db',
    schema: 'src/auth-service/prisma/schema.prisma',
    url:
      process.env.AUTH_DATABASE_URL ||
      'postgres://postgres:root@localhost:5432/auth_db',
  },
  {
    name: 'vehicles_db',
    schema: 'src/vehicles-service/prisma/schema.prisma',
    url:
      process.env.VEHICLES_DATABASE_URL ||
      'postgres://postgres:root@localhost:5432/vehicles_db',
  },
  {
    name: 'traffic_db',
    schema: 'src/traffic-service/prisma/schema.prisma',
    url:
      process.env.TRAFFIC_DATABASE_URL ||
      'postgres://postgres:root@localhost:5432/traffic_db',
  },
  {
    name: 'incidents_db',
    schema: 'src/incidents-service/prisma/schema.prisma',
    url:
      process.env.INCIDENTS_DATABASE_URL ||
      'postgres://postgres:root@localhost:5432/incidents_db',
  },
  {
    name: 'notifications_db',
    schema: 'src/notifications-service/prisma/schema.prisma',
    url:
      process.env.NOTIFICATIONS_DATABASE_URL ||
      'postgres://postgres:root@localhost:5432/notifications_db',
  },
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
      return true;
    }
    console.log(`Database "${dbName}" already exists`);
    return false;
  } finally {
    await client.end();
  }
}

function pushSchema(schemaPath, databaseUrl, forceReset = false) {
  console.log(`Applying Prisma schema for ${schemaPath}`);
  const resetFlag = forceReset ? ' --force-reset' : '';
  execSync(`npx prisma db push --schema=${schemaPath}${resetFlag}`, {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: databaseUrl },
  });
}

async function main() {
  const forceReset =
    process.env.FORCE_DB_RESET === 'true' || process.argv.includes('--reset');

  for (const db of databases) {
    await ensureDatabase(db.name);
  }

  try {
    for (const db of databases) {
      pushSchema(db.schema, db.url, forceReset);
    }
  } catch (err) {
    if (!forceReset) {
      console.error(
        '\nSchema conflict with existing tables. Run: npm run db:reset\n',
      );
    }
    throw err;
  }
  console.log('Database setup complete');
}

main().catch((err) => {
  console.error('Database setup failed:', err.message);
  process.exit(1);
});
