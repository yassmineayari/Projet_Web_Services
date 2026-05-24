# API Endpoints Documentation

## Base URLs

- **API Gateway**: `http://localhost:3000` (GraphQL only)
- **Auth Service**: `http://localhost:3001`
- **Vehicles Service**: `http://localhost:3002`
- **Traffic Service**: `http://localhost:3003`
- **Incidents Service**: `http://localhost:3004`
- **Notifications Service**: `http://localhost:3005`

## Authentication

All endpoints (except registration and login) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Auth Service Endpoints (Port 3001)

### POST /auth/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "expiresIn": "24h",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "OPERATOR",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### POST /auth/login
Login with credentials

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** Same as register

### GET /auth/validate
Validate current JWT token

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "OPERATOR",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Vehicles Service Endpoints (Port 3002)

### POST /vehicles
Create a new vehicle

**Request Body:**
```json
{
  "plateNumber": "ABC-001",
  "brand": "Toyota",
  "model": "Camry",
  "type": "CAR",
  "driverId": "optional-driver-id"
}
```

**Response:**
```json
{
  "id": "uuid",
  "plateNumber": "ABC-001",
  "brand": "Toyota",
  "model": "Camry",
  "type": "CAR",
  "status": "ACTIVE",
  "currentLatitude": null,
  "currentLongitude": null,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### GET /vehicles
Get all vehicles

**Response:**
```json
[
  {
    "id": "uuid",
    "plateNumber": "ABC-001",
    "brand": "Toyota",
    "model": "Camry",
    "type": "CAR",
    "status": "ACTIVE",
    "currentLatitude": 48.8566,
    "currentLongitude": 2.3522,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### GET /vehicles/:id
Get vehicle by ID

**Response:**
```json
{
  "id": "uuid",
  "plateNumber": "ABC-001",
  "brand": "Toyota",
  "model": "Camry",
  "type": "CAR",
  "status": "ACTIVE",
  "currentLatitude": 48.8566,
  "currentLongitude": 2.3522,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### POST /vehicles/:id/gps
Record GPS position for a vehicle

**Request Body:**
```json
{
  "latitude": 48.8566,
  "longitude": 2.3522,
  "speed": 45.5,
  "heading": 270
}
```

**Response:**
```json
{
  "id": "uuid",
  "vehicleId": "vehicle-uuid",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "speed": 45.5,
  "heading": 270,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### GET /vehicles/:id/history
Get GPS history for a vehicle

**Query Parameters:**
- `limit`: Number of records to retrieve (default: 100)

**Response:**
```json
{
  "vehicle": {
    "id": "uuid",
    "plateNumber": "ABC-001",
    "brand": "Toyota",
    "status": "ACTIVE"
  },
  "history": [
    {
      "id": "uuid",
      "latitude": 48.8566,
      "longitude": 2.3522,
      "speed": 45.5,
      "heading": 270,
      "timestamp": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### PATCH /vehicles/:id/status
Update vehicle status

**Request Body:**
```json
{
  "status": "MAINTENANCE"
}
```

**Response:** Updated vehicle object

### DELETE /vehicles/:id
Delete a vehicle

**Response:** Deleted vehicle object

## Traffic Service Endpoints (Port 3003)

### POST /traffic/zones
Create a traffic zone

**Request Body:**
```json
{
  "name": "Downtown Core",
  "description": "Central business district",
  "centerLatitude": 48.8566,
  "centerLongitude": 2.3522,
  "radiusKm": 2.5
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Downtown Core",
  "description": "Central business district",
  "centerLatitude": 48.8566,
  "centerLongitude": 2.3522,
  "radiusKm": 2.5,
  "density": "LOW",
  "vehicleCount": 0,
  "averageSpeed": 0,
  "lastUpdated": null,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### GET /traffic/zones
Get all traffic zones

**Response:** Array of traffic zone objects

### GET /traffic/zones/:id
Get traffic zone by ID

**Response:** Single traffic zone object

### GET /traffic/zones/congested
Get only congested zones (density = HIGH)

**Response:** Array of congested traffic zones

### PATCH /traffic/zones/:id/density
Update zone density and vehicle metrics

**Request Body:**
```json
{
  "vehicleCount": 85,
  "averageSpeed": 8.5
}
```

**Response:** Updated traffic zone with recalculated density

**Density Calculation:**
- HIGH: vehicleCount > 50 AND averageSpeed < 10
- MEDIUM: vehicleCount > 30 AND averageSpeed < 20
- LOW: Otherwise

### DELETE /traffic/zones/:id
Delete a traffic zone

**Response:** Deleted traffic zone object

## Incidents Service Endpoints (Port 3004)

### POST /incidents
Create an incident

**Request Body:**
```json
{
  "type": "ACCIDENT",
  "title": "Car Collision",
  "description": "Two vehicles collided on main street",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "reportedBy": "operator@example.com",
  "affectedRoads": ["Main Street", "5th Avenue"]
}
```

**Incident Types:**
- ACCIDENT
- CONSTRUCTION
- ROAD_CLOSED
- CONGESTION

**Response:**
```json
{
  "id": "uuid",
  "type": "ACCIDENT",
  "status": "REPORTED",
  "title": "Car Collision",
  "description": "Two vehicles collided on main street",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "reportedBy": "operator@example.com",
  "assignedTo": null,
  "resolvedAt": null,
  "affectedRoads": ["Main Street", "5th Avenue"],
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### GET /incidents
Get all incidents

**Response:** Array of incident objects

### GET /incidents/active
Get active incidents (status != RESOLVED)

**Response:** Array of active incident objects

### GET /incidents/:id
Get incident by ID

**Response:** Single incident object

### PATCH /incidents/:id/status
Update incident status

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Status Values:**
- REPORTED
- IN_PROGRESS
- RESOLVED

**Response:** Updated incident object

### PATCH /incidents/:id/assign
Assign incident to an operator

**Request Body:**
```json
{
  "assignedTo": "operator@example.com"
}
```

**Response:** Updated incident object

### DELETE /incidents/:id
Delete an incident

**Response:** Deleted incident object

## Notifications Service Endpoints (Port 3005)

### GET /notifications/user/:userId
Get all notifications for a user

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "type": "INCIDENT",
    "title": "New Incident Alert",
    "message": "Accident reported on Main Street",
    "isRead": false,
    "relatedEntityId": "incident-uuid",
    "relatedEntityType": "INCIDENT",
    "createdAt": "2024-01-01T12:00:00Z"
  }
]
```

### GET /notifications/user/:userId/unread
Get unread notifications for a user

**Response:** Array of unread notification objects

### GET /notifications/:id
Get notification by ID

**Response:** Single notification object

### PATCH /notifications/:id/read
Mark notification as read

**Response:** Updated notification with `isRead: true`

### PATCH /notifications/user/:userId/read-all
Mark all notifications for a user as read

**Response:** Array of updated notification objects

### DELETE /notifications/:id
Delete a notification

**Response:** Deleted notification object

### DELETE /notifications/user/:userId
Delete all notifications for a user

**Response:** Deleted notification objects

## Error Responses

All endpoints may return error responses in this format:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Invalid input data",
  "error": "BadRequest"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Missing or invalid authentication token",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "NotFound"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "InternalServerError"
}
```

## Rate Limiting

Current implementation has no rate limiting. For production, implement:
- 100 requests per minute per user
- 1000 requests per minute per IP address
- Exponential backoff for repeated failures

## Testing Commands

### Using curl

```bash
# Register
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123!","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123!"}'

# Create vehicle (replace TOKEN with actual JWT)
curl -X POST http://localhost:3002/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"plateNumber":"ABC-001","brand":"Toyota","model":"Camry","type":"CAR"}'

# Get vehicles
curl http://localhost:3002/vehicles

# Record GPS
curl -X POST http://localhost:3002/vehicles/VEHICLE_ID/gps \
  -H "Content-Type: application/json" \
  -d '{"latitude":48.8566,"longitude":2.3522,"speed":45.5}'
```

### Using HTTPie

```bash
# Register
http POST http://localhost:3001/auth/register \
  email=user@example.com \
  password=Pass123! \
  firstName=John \
  lastName=Doe

# Login
http POST http://localhost:3001/auth/login \
  email=user@example.com \
  password=Pass123!
```

### Using Node.js fetch

```javascript
const token = 'your_jwt_token';

// Create vehicle
const response = await fetch('http://localhost:3002/vehicles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    plateNumber: 'ABC-001',
    brand: 'Toyota',
    model: 'Camry',
    type: 'CAR'
  })
});

const data = await response.json();
console.log(data);
```

## WebSocket Support (Future)

WebSocket support is planned for real-time updates:
- Live GPS tracking
- Real-time traffic density updates
- Instant incident alerts
- Live notification delivery

## API Versioning (Future)

Future versions may include:
- `/api/v1/...` endpoints
- Backward compatibility
- Deprecation notices
