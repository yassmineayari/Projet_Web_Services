-- Create dedicated databases for each service if they do not already exist.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'auth_db') THEN
    CREATE DATABASE auth_db;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'vehicles_db') THEN
    CREATE DATABASE vehicles_db;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'traffic_db') THEN
    CREATE DATABASE traffic_db;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'incidents_db') THEN
    CREATE DATABASE incidents_db;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'notifications_db') THEN
    CREATE DATABASE notifications_db;
  END IF;
END $$;

\connect auth_db
\i /docker-entrypoint-initdb.d/schema.sql

\connect vehicles_db
\i /docker-entrypoint-initdb.d/schema.sql

\connect traffic_db
\i /docker-entrypoint-initdb.d/schema.sql

\connect incidents_db
\i /docker-entrypoint-initdb.d/schema.sql

\connect notifications_db
\i /docker-entrypoint-initdb.d/schema.sql
