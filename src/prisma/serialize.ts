/** Convert Prisma Decimal fields to plain numbers for JSON/GraphQL. */
export function toNumber(value: unknown): number | null {
  if (value == null) return null;
  return Number(value);
}

export function serializeVehicle<T extends Record<string, unknown>>(vehicle: T) {
  return {
    ...vehicle,
    // Prisma returns Decimal|null for these fields.
    currentLatitude: toNumber(vehicle.currentLatitude),
    currentLongitude: toNumber(vehicle.currentLongitude),

  };
}



export function serializeGpsLocation<T extends Record<string, unknown>>(location: T) {
  return {
    ...location,
    latitude: toNumber(location.latitude),
    longitude: toNumber(location.longitude),
    speed: toNumber(location.speed),
    heading: toNumber(location.heading),
  };
}

export function serializeTrafficZone<T extends Record<string, unknown>>(zone: T) {
  return {
    ...zone,
    centerLatitude: toNumber(zone.centerLatitude),
    centerLongitude: toNumber(zone.centerLongitude),
    radiusKm: toNumber(zone.radiusKm),
    averageSpeed: toNumber(zone.averageSpeed),
    vehicleCount: zone.vehicleCount != null ? Number(zone.vehicleCount) : zone.vehicleCount,
  };
}

export function serializeIncident<T extends Record<string, unknown>>(incident: T) {
  return {
    ...incident,
    latitude: toNumber(incident.latitude),
    longitude: toNumber(incident.longitude),
  };
}
