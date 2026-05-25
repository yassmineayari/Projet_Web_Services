import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { PrismaService } from './prisma/prisma.service';

const mockPrisma = {
  vehicle: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  gPSLocation: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should create a vehicle', async () => {
    const created = {
      id: 'vehicle-1',
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
      status: 'ACTIVE',
      currentLatitude: null,
      currentLongitude: null,
    };

    mockPrisma.vehicle.create.mockResolvedValue(created);

    const result = await service.createVehicle({
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
    } as any);

    expect(mockPrisma.vehicle.create).toHaveBeenCalled();
    expect(result.id).toBe('vehicle-1');
  });

  it('should return all vehicles', async () => {
    const vehicle = {
      id: 'vehicle-1',
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
      status: 'ACTIVE',
      currentLatitude: null,
      currentLongitude: null,
    };

    mockPrisma.vehicle.findMany.mockResolvedValue([vehicle]);

    const result = await service.getAllVehicles();

    expect(result).toEqual([vehicle]);
  });

  it('should throw when vehicle not found', async () => {
    mockPrisma.vehicle.findUnique.mockResolvedValue(null);

    await expect(service.getVehicleById('unknown')).rejects.toThrow(NotFoundException);
  });

  it('should update vehicle status', async () => {
    const vehicle = {
      id: 'vehicle-1',
      status: 'ACTIVE',
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
      currentLatitude: null,
      currentLongitude: null,
    };

    const updated = { ...vehicle, status: 'INACTIVE' };

    mockPrisma.vehicle.findUnique.mockResolvedValue(vehicle);
    mockPrisma.vehicle.update.mockResolvedValue(updated);

    const result = await service.updateVehicleStatus('vehicle-1', 'INACTIVE');

    expect(result.status).toBe('INACTIVE');
    expect(mockPrisma.vehicle.update).toHaveBeenCalledWith({
      where: { id: 'vehicle-1' },
      data: { status: 'INACTIVE' },
    });
  });

  it('should record GPS location and update vehicle', async () => {
    const vehicle = {
      id: 'vehicle-1',
      currentLatitude: null,
      currentLongitude: null,
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
      status: 'ACTIVE',
    };

    const location = {
      id: 'loc-1',
      vehicleId: 'vehicle-1',
      latitude: 45.0,
      longitude: 3.0,
      speed: 60,
      heading: 180,
      timestamp: new Date(),
    };

    mockPrisma.vehicle.findUnique.mockResolvedValue(vehicle);
    mockPrisma.vehicle.update.mockResolvedValue({ ...vehicle, currentLatitude: 45.0, currentLongitude: 3.0 });
    mockPrisma.gPSLocation.create.mockResolvedValue(location);

    const result = await service.recordGPS('vehicle-1', {
      latitude: 45.0,
      longitude: 3.0,
      speed: 60,
      heading: 180,
    } as any);

    expect(mockPrisma.gPSLocation.create).toHaveBeenCalled();
    expect(result.latitude).toBe(45.0);
  });

  it('should return vehicle history', async () => {
    const vehicle = {
      id: 'vehicle-1',
      currentLatitude: 45.0,
      currentLongitude: 3.0,
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
      status: 'ACTIVE',
    };

    const history = [
      {
        id: 'loc-1',
        vehicleId: 'vehicle-1',
        latitude: 45.0,
        longitude: 3.0,
        speed: 55,
        heading: 90,
        timestamp: new Date(),
      },
    ];

    mockPrisma.vehicle.findUnique.mockResolvedValue(vehicle);
    mockPrisma.gPSLocation.findMany.mockResolvedValue(history);

    const result = await service.getVehicleHistory('vehicle-1', 5);

    expect(result.vehicle.id).toBe('vehicle-1');
    expect(result.history).toHaveLength(1);
  });

  it('should delete a vehicle', async () => {
    const vehicle = {
      id: 'vehicle-1',
      status: 'ACTIVE',
      plateNumber: 'ABC-123',
      brand: 'TestBrand',
      model: 'Model X',
      type: 'CAR',
      currentLatitude: null,
      currentLongitude: null,
    };

    mockPrisma.vehicle.findUnique.mockResolvedValue(vehicle);
    mockPrisma.vehicle.delete.mockResolvedValue(vehicle);

    const result = await service.deleteVehicle('vehicle-1');

    expect(result.id).toBe('vehicle-1');
    expect(mockPrisma.vehicle.delete).toHaveBeenCalledWith({ where: { id: 'vehicle-1' } });
  });
});
