# Urban Traffic Management System

A distributed microservices-based urban traffic management platform with GraphQL API Gateway, built with NestJS and Prisma.

## Architecture

The system is built with a microservices architecture consisting of:

1. **API Gateway** (Port 3000) - GraphQL endpoint for all client requests
2. **Authentication Service** (Port 3001) - User management and JWT token generation
3. **Vehicles Service** (Port 3002) - Vehicle management and GPS tracking
4. **Traffic Service** (Port 3003) - Traffic zone management and density calculation
5. **Incidents Service** (Port 3004) - Incident reporting and management
6. **Notifications Service** (Port 3005) - User notifications

## Features

### Authentication Service
- User registration and login
- JWT token generation
- Role-based access control (ADMIN, OPERATOR)
- User profile management
- Secure password hashing with bcrypt

### Vehicles Service
- Vehicle registration and management
- GPS position tracking
- GPS history retrieval
- Vehicle status management
- Multiple vehicle types support

### Traffic Service
- Traffic zone creation and management
- Traffic density calculation (LOW, MEDIUM, HIGH)
- Congested zones detection

### Incidents Service
- Incident reporting system
- Incident types (ACCIDENT, CONSTRUCTION, ROAD_CLOSED, CONGESTION)
- Incident status tracking (REPORTED, IN_PROGRESS, RESOLVED)
- Operator assignment

### Notifications Service
- User notifications
- Read/unread status tracking
- Bulk operations (mark all as read, admin deletions)

## Role permissions (REST endpoints)

- **OPERATOR** can: create incidents, update incident status, assign themselves (via assign endpoint)
- **ADMIN** can: manage vehicles (create/update status/delete), manage traffic zones (create/update/density/delete), manage incidents (assign/update status/delete), manage notifications (delete)

## Technology Stack

- **Backend**: NestJS
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd traffic
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`, then add or override service-specific connection strings in each service folder if needed.
```env
DATABASE_ADMIN_URL=postgres://postgres:root@localhost:5432/postgres
DATABASE_URL=postgres://postgres:root@localhost:5432/traffic_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

For service-specific development, use service env files under `src/<service>/.env` with values like:
```env
DATABASE_URL=postgres://postgres:root@localhost:5432/auth_db
```

5. Create the local PostgreSQL databases:
```bash
createdb auth_db
createdb vehicles_db
createdb traffic_db
createdb incidents_db
createdb notifications_db
```

6. Initialize the databases and generate Prisma clients:
```bash
npm run db:setup
npm run prisma:generate:all
```

## Running the Application

### Development Mode

Start all services:
```bash
npm run start:dev
```

Or start individual services:
```bash
# API Gateway
npm run start:dev -- --app api-gateway

# Auth Service
npm run start:dev -- --app auth-service

# Vehicles Service
npm run start:dev -- --app vehicles-service

# Traffic Service
npm run start:dev -- --app traffic-service

# Incidents Service
npm run start:dev -- --app incidents-service

# Notifications Service
npm run start:dev -- --app notifications-service
```

### Production Build

```bash
npm run build
npm run start:prod
```

## API Documentation

### GraphQL Playground

Access GraphQL Playground at: `http://localhost:3000/graphql`

### Authentication

All GraphQL queries and mutations (except register/login) require authentication. Include JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

## GraphQL Queries and Mutations

### Authentication

#### Register
```graphql
mutation {
  register(
    email: "user@example.com"
    password: "password123"
    firstName: "John"
    lastName: "Doe"
  ) {
    accessToken
    refreshToken
    expiresIn
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
```

#### Login
```graphql
mutation {
  login(
    email: "user@example.com"
    password: "password123"
  ) {
    accessToken
    refreshToken
    expiresIn
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
```

### Vehicles

#### Create Vehicle
```graphql
mutation {
  createVehicle(
    plateNumber: "ABC-123"
    brand: "Toyota"
    model: "Camry"
    type: "CAR"
  ) {
    id
    plateNumber
    brand
    model
    status
  }
}
```

#### Get All Vehicles
```graphql
query {
  vehicles {
    id
    plateNumber
    brand
    model
    type
    status
    currentLatitude
    currentLongitude
  }
}
```

#### Record GPS Position
```graphql
mutation {
  recordGPS(
    vehicleId: "uuid"
    latitude: 48.8566
    longitude: 2.3522
    speed: 45.5
    heading: 270
  ) {
    id
    latitude
    longitude
    speed
    heading
    timestamp
  }
}
```

#### Get Vehicle History
```graphql
query {
  vehicleHistory(vehicleId: "uuid") {
    vehicle {
      id
      plateNumber
      status
    }
    history {
      id
      latitude
      longitude
      speed
      timestamp
    }
  }
}
```

### Traffic Management

#### Create Traffic Zone
```graphql
mutation {
  createTrafficZone(
    name: "City Center"
    description: "Downtown traffic zone"
    centerLatitude: 48.8566
    centerLongitude: 2.3522
    radiusKm: 2.5
  ) {
    id
    name
    density
    vehicleCount
  }
}
```

#### Get All Traffic Zones
```graphql
query {
  trafficZones {
    id
    name
    density
    vehicleCount
    averageSpeed
    lastUpdated
  }
}
```

#### Get Congested Zones
```graphql
query {
  congestedZones {
    id
    name
    density
    vehicleCount
    averageSpeed
  }
}
```

#### Update Zone Density
```graphql
mutation {
  updateZoneDensity(
    zoneId: "uuid"
    vehicleCount: 75
    averageSpeed: 12.5
  ) {
    id
    density
    vehicleCount
    averageSpeed
  }
}
```

### Incidents

#### Create Incident
```graphql
mutation {
  createIncident(
    type: "ACCIDENT"
    title: "Car Collision"
    description: "Two vehicles collision on main street"
    latitude: 48.8566
    longitude: 2.3522
    reportedBy: "user@example.com"
  ) {
    id
    type
    status
    title
    createdAt
  }
}
```

#### Get All Incidents
```graphql
query {
  incidents {
    id
    type
    status
    title
    description
    latitude
    longitude
    reportedBy
  }
}
```

#### Get Active Incidents
```graphql
query {
  activeIncidents {
    id
    type
    status
    title
    assignedTo
  }
}
```

#### Update Incident Status
```graphql
mutation {
  updateIncidentStatus(
    incidentId: "uuid"
    status: "IN_PROGRESS"
  ) {
    id
    status
  }
}
```

#### Assign Incident
```graphql
mutation {
  assignIncident(
    incidentId: "uuid"
    assignedTo: "operator@example.com"
  ) {
    id
    assignedTo
    status
  }
}
```

### Notifications

#### Get User Notifications
```graphql
query {
  notificationsByUser(userId: "uuid") {
    id
    type
    title
    message
    isRead
    createdAt
  }
}
```

#### Get Unread Notifications
```graphql
query {
  unreadNotifications(userId: "uuid") {
    id
    type
    title
    message
    createdAt
  }
}
```

#### Mark Notification as Read
```graphql
mutation {
  markNotificationAsRead(id: "uuid") {
    id
    isRead
  }
}
```

#### Mark All Notifications as Read
```graphql
mutation {
  markAllNotificationsAsRead(userId: "uuid") {
    id
    isRead
  }
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  role ENUM('ADMIN', 'OPERATOR'),
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Vehicles Table
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY,
  plateNumber VARCHAR UNIQUE NOT NULL,
  brand VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  status ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE'),
  currentLatitude DECIMAL(11,8),
  currentLongitude DECIMAL(11,8),
  driverId VARCHAR,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### GPS Locations Table
```sql
CREATE TABLE gps_locations (
  id UUID PRIMARY KEY,
  vehicleId UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  latitude DECIMAL(11,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  speed DECIMAL(5,2),
  heading DECIMAL(8,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Traffic Zones Table
```sql
CREATE TABLE traffic_zones (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  centerLatitude DECIMAL(11,8) NOT NULL,
  centerLongitude DECIMAL(11,8) NOT NULL,
  radiusKm DECIMAL(8,2) NOT NULL,
  density ENUM('LOW', 'MEDIUM', 'HIGH'),
  vehicleCount INT DEFAULT 0,
  averageSpeed DECIMAL(5,2) DEFAULT 0,
  lastUpdated TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Incidents Table
```sql
CREATE TABLE incidents (
  id UUID PRIMARY KEY,
  type ENUM('ACCIDENT', 'CONSTRUCTION', 'ROAD_CLOSED', 'CONGESTION'),
  status ENUM('REPORTED', 'IN_PROGRESS', 'RESOLVED'),
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  latitude DECIMAL(11,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  reportedBy VARCHAR,
  assignedTo VARCHAR,
  resolvedAt TIMESTAMP,
  affectedRoads TEXT[],
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  userId VARCHAR NOT NULL,
  type ENUM('INCIDENT', 'TRAFFIC_ALERT', 'VEHICLE_UPDATE', 'SYSTEM'),
  title VARCHAR NOT NULL,
  message VARCHAR NOT NULL,
  isRead BOOLEAN DEFAULT false,
  relatedEntityId VARCHAR,
  relatedEntityType VARCHAR,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing

Run unit tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:cov
```

## Project Structure

```
traffic/
├── src/
│   ├── api-gateway/
│   │   ├── resolvers/
│   │   ├── schemas/
│   │   └── api-gateway.module.ts
│   ├── auth-service/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   └── auth.module.ts
│   ├── vehicles-service/
│   ├── traffic-service/
│   ├── incidents-service/
│   ├── notifications-service/
│   ├── config/
│   └── main.ts
├── database/
├── config/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Security Considerations

1. **JWT Secret**: Change the JWT_SECRET in production
2. **CORS**: Configure CORS appropriately for your domain
3. **Rate Limiting**: Consider implementing rate limiting in production
4. **Input Validation**: All inputs are validated using class-validator
5. **Database Connection**: Use SSL connections in production
6. **Environment Variables**: Never commit .env files to version control

## Error Handling

The API provides consistent error responses:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "BadRequest"
}
```

## Future Enhancements

- WebSocket support for real-time updates
- Advanced analytics and reporting
- Mobile app integration
- Machine learning for traffic prediction
- Integration with IoT devices
- Real-time map visualization
- Advanced user permissions
- Audit logging
- Rate limiting
- API versioning

## Git Workflow

1. Create feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat: describe your changes"
```

3. Push to repository:
```bash
git push origin feature/your-feature-name
```

4. Create Pull Request

## Author

Sarra maazoun 
yassmine ayari 
## Support

For issues and questions, please contact us.
