# Urban Traffic Management System - Setup & Running Guide

## Quick Start

### 1. Prerequisites
- Node.js 16+ installed
- PostgreSQL database running
- npm or yarn package manager

### 2. Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your database credentials
# Then create the database
createdb traffic_db
```

### 3. Running the Application

#### Option A: Run All Services (Recommended for Development)
```bash
npm run start:all
```

This will start all 6 services simultaneously:
- API Gateway (Port 3000) - GraphQL endpoint
- Auth Service (Port 3001)
- Vehicles Service (Port 3002)
- Traffic Service (Port 3003)
- Incidents Service (Port 3004)
- Notifications Service (Port 3005)

#### Option B: Run Individual Services

```bash
# Terminal 1: API Gateway (GraphQL)
npm run start:gateway

# Terminal 2: Authentication Service
npm run start:auth

# Terminal 3: Vehicles Service
npm run start:vehicles

# Terminal 4: Traffic Service
npm run start:traffic

# Terminal 5: Incidents Service
npm run start:incidents

# Terminal 6: Notifications Service
npm run start:notifications
```

### 4. Database Setup

The database schema is automatically created by TypeORM on first startup due to `synchronize: true`.

To manually import sample data:
```bash
psql -U postgres -d traffic_db < database/schema.sql
```

### 5. Testing the API

#### GraphQL Playground
Open browser and navigate to:
```
http://localhost:3000/graphql
```

#### REST API with Postman
1. Import `postman_collection.json` into Postman
2. Set environment variables:
   - `base_url`: http://localhost:3000
   - `jwt_token`: (obtained after login)
3. Start making requests

### 6. First Steps

#### 1. Register a User
```graphql
mutation {
  register(
    email: "operator@traffic.com"
    password: "Password123!"
    firstName: "John"
    lastName: "Operator"
  ) {
    accessToken
    user { id email role }
  }
}
```

#### 2. Login
```graphql
mutation {
  login(
    email: "operator@traffic.com"
    password: "Password123!"
  ) {
    accessToken
    user { id email role }
  }
}
```

#### 3. Create a Vehicle
```graphql
mutation {
  createVehicle(
    plateNumber: "ABC-001"
    brand: "Toyota"
    model: "Camry"
    type: "CAR"
  ) {
    id plateNumber status
  }
}
```

#### 4. Record GPS
```graphql
mutation {
  recordGPS(
    vehicleId: "YOUR_VEHICLE_ID"
    latitude: 48.8566
    longitude: 2.3522
    speed: 45.5
  ) {
    id latitude longitude
  }
}
```

### 7. Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=traffic_db

# Security
JWT_SECRET=your_secret_key_here

# Services URLs
API_GATEWAY_PORT=3000
AUTH_SERVICE_URL=http://localhost:3001
VEHICLES_SERVICE_URL=http://localhost:3002
TRAFFIC_SERVICE_URL=http://localhost:3003
INCIDENTS_SERVICE_URL=http://localhost:3004
NOTIFICATIONS_SERVICE_URL=http://localhost:3005

# Environment
NODE_ENV=development
LOG_LEVEL=debug
```

### 8. Debugging

#### Check if services are running
```bash
# Check API Gateway
curl http://localhost:3000/graphql

# Check Auth Service
curl http://localhost:3001/auth/user

# etc...
```

#### View logs
The services will output logs to console. For production, configure logging to files.

### 9. Building for Production

```bash
# Build all TypeScript files
npm run build

# Set NODE_ENV to production
export NODE_ENV=production

# Run in production mode
npm run start:prod
```

### 10. Troubleshooting

#### Database Connection Issues
```bash
# Check PostgreSQL is running
psql -U postgres

# Recreate database if needed
dropdb traffic_db
createdb traffic_db
```

#### Services not communicating
- Verify all services are running on correct ports
- Check firewall settings
- Verify environment variables in .env
- Check service logs for errors

#### GraphQL not working
- Ensure API Gateway is running on port 3000
- Check that dependent services are running
- Verify JWT token is valid (if making authenticated requests)

### 11. Testing with Different Tools

#### Using curl with GraphQL
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"query": "query { vehicles { id plateNumber } }"}'
```

#### Using Node.js client
```bash
npm install graphql-request
```

Then in your code:
```javascript
const { request, gql } = require('graphql-request');

const query = gql`
  query {
    vehicles {
      id
      plateNumber
      status
    }
  }
`;

request('http://localhost:3000/graphql', query).then(data => console.log(data));
```

### 12. Documentation Files

- `README.md` - Full system documentation
- `GRAPHQL_QUERIES.md` - GraphQL examples
- `UML_DIAGRAMS.md` - System architecture diagrams
- `postman_collection.json` - Postman API collection
- `database/schema.sql` - Database schema

### 13. Git Workflow

```bash
# Clone and setup
git clone <repository>
cd traffic
npm install
cp .env.example .env

# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: describe your changes"

# Push and create PR
git push origin feature/my-feature
```

### 14. Support & Help

For issues:
1. Check the README.md for detailed documentation
2. Review GRAPHQL_QUERIES.md for API examples
3. Check service logs for error messages
4. Verify database connection
5. Ensure all services are running

## Common Commands

```bash
# Install dependencies
npm install

# Start all services
npm run start:all

# Build project
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Lint code
npm run lint

# Format code
npm run format
```

## Architecture Reminder

- **API Gateway**: Single entry point (GraphQL) on port 3000
- **Auth Service**: User authentication (port 3001)
- **Vehicles Service**: Vehicle & GPS tracking (port 3002)
- **Traffic Service**: Traffic analysis (port 3003)
- **Incidents Service**: Incident management (port 3004)
- **Notifications Service**: User notifications (port 3005)
- **Database**: PostgreSQL (single shared instance)

All services communicate via HTTP/REST internally and with the database via TypeORM.
