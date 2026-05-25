import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { PrismaService } from './prisma/prisma.service';
import { TrafficDensity } from './enums/traffic-density.enum';

const mockPrisma = {
  trafficZone: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TrafficService', () => {
  let service: TrafficService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrafficService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TrafficService>(TrafficService);
    jest.clearAllMocks();
  });

  it('should create a traffic zone', async () => {
    const zone = {
      id: 'zone-1',
      name: 'Test Zone',
      description: 'Test',
      centerLatitude: 45.0,
      centerLongitude: 3.0,
      radiusKm: 2.5,
      density: TrafficDensity.LOW,
      vehicleCount: 0,
      averageSpeed: 0,
      lastUpdated: null,
    };

    mockPrisma.trafficZone.create.mockResolvedValue(zone);

    const result = await service.createZone({
      name: zone.name,
      description: zone.description,
      centerLatitude: zone.centerLatitude,
      centerLongitude: zone.centerLongitude,
      radiusKm: zone.radiusKm,
    } as any);

    expect(mockPrisma.trafficZone.create).toHaveBeenCalled();
    expect(result).toEqual(zone);
  });

  it('should return all zones', async () => {
    const zone = {
      id: 'zone-1',
      name: 'Test Zone',
      centerLatitude: 45.0,
      centerLongitude: 3.0,
      radiusKm: 2.5,
      density: TrafficDensity.LOW,
      vehicleCount: 0,
      averageSpeed: 0,
      lastUpdated: null,
    };

    mockPrisma.trafficZone.findMany.mockResolvedValue([zone]);

    const result = await service.getAllZones();

    expect(result).toEqual([zone]);
    expect(mockPrisma.trafficZone.findMany).toHaveBeenCalled();
  });

  it('should throw when zone not found by id', async () => {
    mockPrisma.trafficZone.findUnique.mockResolvedValue(null);

    await expect(service.getZoneById('unknown')).rejects.toThrow(NotFoundException);
  });

  it('should update density to HIGH when vehicle count and speed thresholds are met', async () => {
    const existingZone = {
      id: 'zone-1',
      name: 'Test Zone',
      density: TrafficDensity.LOW,
      vehicleCount: 10,
      averageSpeed: 30,
      centerLatitude: 45.0,
      centerLongitude: 3.0,
      radiusKm: 2.5,
      lastUpdated: null,
    };

    const updatedZone = {
      ...existingZone,
      vehicleCount: 60,
      averageSpeed: 8,
      density: TrafficDensity.HIGH,
      lastUpdated: new Date(),
    };

    mockPrisma.trafficZone.findUnique.mockResolvedValue(existingZone);
    mockPrisma.trafficZone.update.mockResolvedValue(updatedZone);

    const result = await service.updateZoneDensity('zone-1', 60, 8);

    expect(mockPrisma.trafficZone.update).toHaveBeenCalledWith({
      where: { id: 'zone-1' },
      data: expect.objectContaining({
        vehicleCount: 60,
        averageSpeed: 8,
        density: TrafficDensity.HIGH,
      }),
    });
    expect(result).toEqual(updatedZone);
  });

  it('should get congested zones', async () => {
    const highZone = {
      id: 'zone-1',
      density: TrafficDensity.HIGH,
      centerLatitude: 45.0,
      centerLongitude: 3.0,
      radiusKm: 2.5,
      vehicleCount: 60,
      averageSpeed: 8,
      lastUpdated: new Date(),
    };

    mockPrisma.trafficZone.findMany.mockResolvedValue([highZone]);

    const result = await service.getCongestedZones();

    expect(mockPrisma.trafficZone.findMany).toHaveBeenCalledWith({
      where: { density: TrafficDensity.HIGH },
    });
    expect(result).toEqual([highZone]);
  });

  it('should delete a zone when it exists', async () => {
    const existingZone = {
      id: 'zone-1',
      name: 'Test Zone',
      density: TrafficDensity.LOW,
      centerLatitude: 45.0,
      centerLongitude: 3.0,
      radiusKm: 2.5,
      vehicleCount: 10,
      averageSpeed: 20,
      lastUpdated: null,
    };

    mockPrisma.trafficZone.findUnique.mockResolvedValue(existingZone);
    mockPrisma.trafficZone.delete.mockResolvedValue(existingZone);

    const result = await service.deleteZone('zone-1');

    expect(mockPrisma.trafficZone.delete).toHaveBeenCalledWith({ where: { id: 'zone-1' } });
    expect(result).toEqual(existingZone);
  });
});
