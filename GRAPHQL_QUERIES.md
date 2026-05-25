# GraphQL Test Queries and Mutations

## Registration and Authentication

### 1. Register a New User

```graphql
mutation RegisterUser {
  register(
    email: "newoperator@traffic.com"
    password: "SecurePass123!"
    firstName: "John"
    lastName: "Operator"
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
      isActive
      createdAt
    }
  }
}
```

### 2. Login User

```graphql
mutation LoginUser {
  login(
    email: "operator@traffic.com"
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

### 3. Validate Token

```graphql
query ValidateToken {
  validateToken(token: "your_jwt_token_here") {
    id
    email
    firstName
    lastName
    role
  }
}
```

## Vehicle Management

### 4. Create a New Vehicle

```graphql
mutation CreateVehicle {
  createVehicle(
    plateNumber: "NEW-2024"
    brand: "Tesla"
    model: "Model 3"
    type: "ELECTRIC_CAR"
  ) {
    id
    plateNumber
    brand
    model
    type
    status
    createdAt
  }
}
```

### 5. Get All Vehicles

```graphql
query GetAllVehicles {
  vehicles {
    id
    plateNumber
    brand
    model
    type
    status
    currentLatitude
    currentLongitude
    createdAt
  }
}
```

### 6. Get Vehicle Details

```graphql
query GetVehicleDetails {
  vehicle(id: "vehicle_uuid_here") {
    id
    plateNumber
    brand
    model
    type
    status
    currentLatitude
    currentLongitude
    driverId
    createdAt
  }
}
```

### 7. Record GPS Position

```graphql
mutation RecordGPS {
  recordGPS(
    vehicleId: "vehicle_uuid_here"
    latitude: 48.8566
    longitude: 2.3522
    speed: 45.5
    heading: 270.0
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

### 8. Get Vehicle History

```graphql
query GetVehicleHistory {
  vehicleHistory(vehicleId: "vehicle_uuid_here") {
    vehicle {
      id
      plateNumber
      brand
      model
      status
    }
    history {
      id
      latitude
      longitude
      speed
      heading
      timestamp
    }
  }
}
```

### 9. Update Vehicle Status

```graphql
mutation UpdateVehicleStatus {
  updateVehicleStatus(
    vehicleId: "vehicle_uuid_here"
    status: "MAINTENANCE"
  ) {
    id
    plateNumber
    status
  }
}
```

### 10. Delete Vehicle

```graphql
mutation DeleteVehicle {
  deleteVehicle(id: "vehicle_uuid_here") {
    id
    plateNumber
  }
}
```

## Traffic Management

### 11. Create Traffic Zone

```graphql
mutation CreateTrafficZone {
  createTrafficZone(
    name: "New Downtown Zone"
    description: "Central business district with high traffic density"
    centerLatitude: 48.8566
    centerLongitude: 2.3522
    radiusKm: 2.5
  ) {
    id
    name
    description
    centerLatitude
    centerLongitude
    radiusKm
    density
    vehicleCount
    averageSpeed
    createdAt
  }
}
```

### 12. Get All Traffic Zones

```graphql
query GetAllTrafficZones {
  trafficZones {
    id
    name
    description
    centerLatitude
    centerLongitude
    radiusKm
    density
    vehicleCount
    averageSpeed
    lastUpdated
    createdAt
  }
}
```

### 13. Get Traffic Zone Details

```graphql
query GetTrafficZoneDetails {
  trafficZone(id: "zone_uuid_here") {
    id
    name
    description
    centerLatitude
    centerLongitude
    radiusKm
    density
    vehicleCount
    averageSpeed
    lastUpdated
  }
}
```

### 14. Get Congested Zones

```graphql
query GetCongestedZones {
  congestedZones {
    id
    name
    density
    vehicleCount
    averageSpeed
    centerLatitude
    centerLongitude
  }
}
```

### 15. Update Zone Density

```graphql
mutation UpdateZoneDensity {
  updateZoneDensity(
    zoneId: "zone_uuid_here"
    vehicleCount: 85
    averageSpeed: 8.5
  ) {
    id
    name
    density
    vehicleCount
    averageSpeed
    lastUpdated
  }
}
```

### 16. Delete Traffic Zone

```graphql
mutation DeleteTrafficZone {
  deleteTrafficZone(id: "zone_uuid_here") {
    id
    name
  }
}
```

## Incident Management

### 17. Create Incident

```graphql
mutation CreateIncident {
  createIncident(
    type: "ACCIDENT"
    title: "Vehicle Collision on Main Street"
    description: "Two vehicles collided at the intersection causing traffic congestion"
    latitude: 48.8566
    longitude: 2.3522
    reportedBy: "operator@traffic.com"
  ) {
    id
    type
    status
    title
    description
    latitude
    longitude
    reportedBy
    createdAt
  }
}
```

### 18. Get All Incidents

```graphql
query GetAllIncidents {
  incidents {
    id
    type
    status
    title
    description
    latitude
    longitude
    reportedBy
    assignedTo
    createdAt
  }
}
```

### 19. Get Active Incidents

```graphql
query GetActiveIncidents {
  activeIncidents {
    id
    type
    status
    title
    latitude
    longitude
    assignedTo
    createdAt
  }
}
```

### 20. Get Incident Details

```graphql
query GetIncidentDetails {
  incident(id: "incident_uuid_here") {
    id
    type
    status
    title
    description
    latitude
    longitude
    reportedBy
    assignedTo
    resolvedAt
    affectedRoads
    createdAt
  }
}
```

### 21. Update Incident Status

```graphql
mutation UpdateIncidentStatus {
  updateIncidentStatus(
    incidentId: "incident_uuid_here"
    status: "IN_PROGRESS"
  ) {
    id
    status
  }
}
```

### 22. Assign Incident

```graphql
mutation AssignIncident {
  assignIncident(
    incidentId: "incident_uuid_here"
    assignedTo: "operator@traffic.com"
  ) {
    id
    assignedTo
    status
  }
}
```

### 23. Delete Incident

```graphql
mutation DeleteIncident {
  deleteIncident(id: "incident_uuid_here") {
    id
    title
  }
}
```

## Notifications

### 24. Get User Notifications

```graphql
query GetUserNotifications {
  notificationsByUser(userId: "user_uuid_here") {
    id
    type
    title
    message
    isRead
    createdAt
  }
}
```

### 25. Get Unread Notifications

```graphql
query GetUnreadNotifications {
  unreadNotifications(userId: "user_uuid_here") {
    id
    type
    title
    message
    relatedEntityType
    createdAt
  }
}
```

### 26. Get Notification Details

```graphql
query GetNotificationDetails {
  notification(id: "notification_uuid_here") {
    id
    userId
    type
    title
    message
    isRead
    relatedEntityId
    relatedEntityType
    createdAt
  }
}
```

### 27. Mark Notification as Read

```graphql
mutation MarkNotificationAsRead {
  markNotificationAsRead(id: "notification_uuid_here") {
    id
    isRead
  }
}
```

### 28. Mark All Notifications as Read

```graphql
mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead(userId: "user_uuid_here") {
    id
    isRead
  }
}
```

### 29. Delete Notification

```graphql
mutation DeleteNotification {
  deleteNotification(id: "notification_uuid_here") {
    id
  }
}
```

## Advanced Scenarios

### Scenario 1: Complete Traffic Monitoring Flow

1. Record vehicle GPS locations:
```graphql
mutation {
  gps1: recordGPS(
    vehicleId: "vehicle1_uuid"
    latitude: 48.8566
    longitude: 2.3522
    speed: 50.0
  ) { id }
  gps2: recordGPS(
    vehicleId: "vehicle2_uuid"
    latitude: 48.8580
    longitude: 2.3530
    speed: 35.0
  ) { id }
}
```

2. Update traffic zone density:
```graphql
mutation {
  updateZoneDensity(
    zoneId: "zone1_uuid"
    vehicleCount: 45
    averageSpeed: 42.5
  ) {
    id
    density
  }
}
```

### Scenario 2: Incident Response Flow

1. Create incident:
```graphql
mutation {
  createIncident(
    type: "ACCIDENT"
    title: "Major incident"
    description: "Details..."
    latitude: 48.8566
    longitude: 2.3522
  ) { id }
}
```

2. Assign to operator and update status:
```graphql
mutation {
  assignIncident(
    incidentId: "incident_uuid"
    assignedTo: "operator@traffic.com"
  ) { id }
  updateIncidentStatus(
    incidentId: "incident_uuid"
    status: "IN_PROGRESS"
  ) { id }
}
```

## Testing Notes

- Replace all `*_uuid_here` with actual UUIDs from your database
- Use the JWT token obtained from login for authenticated requests
- Add token in Authorization header: `Authorization: Bearer your_token_here`
- All timestamps are in ISO 8601 format
- Coordinates use decimal degrees (latitude: -90 to 90, longitude: -180 to 180)
