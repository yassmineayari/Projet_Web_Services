import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { PrismaService } from './prisma/prisma.service';
import { IncidentStatus, IncidentType } from './enums/incident.enum';

const mockPrisma = {
  incident: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('IncidentsService', () => {
  let service: IncidentsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidentsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<IncidentsService>(IncidentsService);
  });

  it('should create an incident', async () => {
    const incident = {
      id: 'incident-1',
      title: 'Test Incident',
      type: IncidentType.ACCIDENT,
      status: IncidentStatus.REPORTED,
      description: 'A test incident',
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    };

    mockPrisma.incident.create.mockResolvedValue(incident);

    const result = await service.createIncident({
      title: 'Test Incident',
      type: IncidentType.ACCIDENT,
      status: IncidentStatus.REPORTED,
      description: 'A test incident',
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    } as any);

    expect(result.id).toBe('incident-1');
  });

  it('should return all incidents', async () => {
    const incident = {
      id: 'incident-1',
      type: IncidentType.ACCIDENT,
      status: IncidentStatus.REPORTED,
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    };

    mockPrisma.incident.findMany.mockResolvedValue([incident]);

    const result = await service.getAllIncidents();

    expect(result).toEqual([incident]);
  });

  it('should throw when incident not found', async () => {
    mockPrisma.incident.findUnique.mockResolvedValue(null);

    await expect(service.getIncidentById('unknown')).rejects.toThrow(NotFoundException);
  });

  it('should update incident status and set resolvedAt when resolved', async () => {
    const incident = {
      id: 'incident-1',
      status: IncidentStatus.IN_PROGRESS,
      type: IncidentType.ACCIDENT,
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    };

    const updated = {
      ...incident,
      status: IncidentStatus.RESOLVED,
      resolvedAt: new Date(),
    };

    mockPrisma.incident.findUnique.mockResolvedValue(incident);
    mockPrisma.incident.update.mockResolvedValue(updated);

    const result = await service.updateIncidentStatus('incident-1', { status: IncidentStatus.RESOLVED } as any);

    expect(result.status).toBe(IncidentStatus.RESOLVED);
    expect(result.resolvedAt).toBeDefined();
  });

  it('should assign an incident', async () => {
    const incident = {
      id: 'incident-1',
      status: IncidentStatus.REPORTED,
      type: IncidentType.ACCIDENT,
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    };

    const assigned = { ...incident, assignedTo: 'operator-1' };

    mockPrisma.incident.findUnique.mockResolvedValue(incident);
    mockPrisma.incident.update.mockResolvedValue(assigned);

    const result = await service.assignIncident('incident-1', 'operator-1');

    expect(result.assignedTo).toBe('operator-1');
  });

  it('should get active incidents', async () => {
    const incident = {
      id: 'incident-1',
      status: IncidentStatus.REPORTED,
      type: IncidentType.ACCIDENT,
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    };

    mockPrisma.incident.findMany.mockResolvedValue([incident]);

    const result = await service.getActiveIncidents();

    expect(result).toEqual([incident]);
  });

  it('should delete an incident', async () => {
    const incident = {
      id: 'incident-1',
      status: IncidentStatus.REPORTED,
      type: IncidentType.ACCIDENT,
      latitude: 45.0,
      longitude: 3.0,
      affectedRoads: ['Road A'],
    };

    mockPrisma.incident.findUnique.mockResolvedValue(incident);
    mockPrisma.incident.delete.mockResolvedValue(incident);

    const result = await service.deleteIncident('incident-1');

    expect(result.id).toBe('incident-1');
    expect(mockPrisma.incident.delete).toHaveBeenCalledWith({ where: { id: 'incident-1' } });
  });
});
