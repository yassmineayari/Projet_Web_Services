-- Traffic Management Database Schema
-- PostgreSQL

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('ADMIN', 'OPERATOR');
CREATE TYPE vehicle_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');
CREATE TYPE traffic_density_enum AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE incident_type_enum AS ENUM ('ACCIDENT', 'CONSTRUCTION', 'ROAD_CLOSED', 'CONGESTION');
CREATE TYPE incident_status_enum AS ENUM ('REPORTED', 'IN_PROGRESS', 'RESOLVED');
CREATE TYPE notification_type_enum AS ENUM ('INCIDENT', 'TRAFFIC_ALERT', 'VEHICLE_UPDATE', 'SYSTEM');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  role user_role DEFAULT 'OPERATOR',
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "plateNumber" VARCHAR(50) UNIQUE NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status vehicle_status_enum DEFAULT 'ACTIVE',
  "currentLatitude" DECIMAL(11, 8),
  "currentLongitude" DECIMAL(11, 8),
  "driverId" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GPS Locations table
CREATE TABLE IF NOT EXISTS gps_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "vehicleId" UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  latitude DECIMAL(11, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  speed DECIMAL(5, 2),
  heading DECIMAL(8, 2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_vehicle_timestamp ("vehicleId", timestamp)
);

-- Traffic Zones table
CREATE TABLE IF NOT EXISTS traffic_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  "centerLatitude" DECIMAL(11, 8) NOT NULL,
  "centerLongitude" DECIMAL(11, 8) NOT NULL,
  "radiusKm" DECIMAL(8, 2) NOT NULL,
  density traffic_density_enum DEFAULT 'LOW',
  "vehicleCount" INT DEFAULT 0,
  "averageSpeed" DECIMAL(5, 2) DEFAULT 0,
  "lastUpdated" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type incident_type_enum NOT NULL,
  status incident_status_enum DEFAULT 'REPORTED',
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  latitude DECIMAL(11, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  "reportedBy" VARCHAR(255),
  "assignedTo" VARCHAR(255),
  "resolvedAt" TIMESTAMP,
  "affectedRoads" TEXT[],
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status_type (status, type),
  INDEX idx_created ("createdAt")
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" VARCHAR(255) NOT NULL,
  type notification_type_enum NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  "isRead" BOOLEAN DEFAULT false,
  "relatedEntityId" VARCHAR(255),
  "relatedEntityType" VARCHAR(100),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_read ("userId", "isRead"),
  INDEX idx_user_created ("userId", "createdAt")
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_vehicles_plate ON vehicles("plateNumber");
CREATE INDEX IF NOT EXISTS idx_gps_vehicle ON gps_locations("vehicleId");
CREATE INDEX IF NOT EXISTS idx_traffic_zones_location ON traffic_zones("centerLatitude", "centerLongitude");
CREATE INDEX IF NOT EXISTS idx_incidents_location ON incidents(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications("userId");

-- Sample data for testing
INSERT INTO users (email, password, "firstName", "lastName", role, "isActive")
VALUES 
  ('admin@traffic.com', '$2b$10$YourHashedPasswordHere', 'Admin', 'User', 'ADMIN', true),
  ('operator@traffic.com', '$2b$10$YourHashedPasswordHere', 'Operator', 'User', 'OPERATOR', true),
  ('test@traffic.com', '$2b$10$YourHashedPasswordHere', 'Test', 'User', 'OPERATOR', true)
ON CONFLICT DO NOTHING;

-- Sample vehicles
INSERT INTO vehicles ("plateNumber", brand, model, type, status)
VALUES 
  ('ABC-001', 'Toyota', 'Camry', 'CAR', 'ACTIVE'),
  ('ABC-002', 'Honda', 'Civic', 'CAR', 'ACTIVE'),
  ('BUS-001', 'Mercedes', 'Citaro', 'BUS', 'ACTIVE'),
  ('TRK-001', 'Volvo', 'FH16', 'TRUCK', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- Sample traffic zones
INSERT INTO traffic_zones (name, description, "centerLatitude", "centerLongitude", "radiusKm", density)
VALUES 
  ('City Center', 'Downtown area with high traffic', 48.8566, 2.3522, 2.5, 'LOW'),
  ('Airport', 'Airport approach zone', 48.8627, 2.5500, 5.0, 'LOW'),
  ('Highway Junction', 'Main highway intersection', 48.8700, 2.3300, 1.5, 'LOW'),
  ('Business District', 'Commercial area', 48.8650, 2.3400, 3.0, 'LOW')
ON CONFLICT DO NOTHING;
