import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { serializeIncident } from '../prisma/serialize';
import { IncidentStatus, IncidentType } from './enums/incident.enum';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentStatusDto } from './dto/update-incident-status.dto';

@Injectable()
export class IncidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createIncident(createIncidentDto: CreateIncidentDto) {
    const incident = await this.prisma.incident.create({
      data: {
        ...createIncidentDto,
        affectedRoads: createIncidentDto.affectedRoads,
      },
    });

    return serializeIncident(incident);
  }

  async getAllIncidents() {
    const incidents = await this.prisma.incident.findMany();
    return incidents.map(serializeIncident);
  }

  async getIncidentById(id: string) {
    const incident = await this.prisma.incident.findUnique({ where: { id } });
    if (!incident) throw new NotFoundException('Incident not found');
    return serializeIncident(incident);
  }

  async getIncidentsByStatus(status: IncidentStatus) {
    const incidents = await this.prisma.incident.findMany({ where: { status } });
    return incidents.map(serializeIncident);
  }

  async getIncidentsByType(type: IncidentType) {
    const incidents = await this.prisma.incident.findMany({ where: { type } });
    return incidents.map(serializeIncident);
  }

  async updateIncidentStatus(id: string, updateIncidentStatusDto: UpdateIncidentStatusDto) {
    await this.getIncidentById(id);

    const data: any = { status: updateIncidentStatusDto.status };
    if (updateIncidentStatusDto.status === IncidentStatus.RESOLVED) {
      data.resolvedAt = new Date();
    }

    const updated = await this.prisma.incident.update({
      where: { id },
      data,
    });
    return serializeIncident(updated);
  }

  async assignIncident(id: string, assignedTo: string) {
    await this.getIncidentById(id);

    const incident = await this.prisma.incident.update({
      where: { id },
      data: { assignedTo },
    });
    return serializeIncident(incident);
  }

  async getActiveIncidents() {
    const incidents = await this.prisma.incident.findMany({
      where: {
        status: {
          in: [IncidentStatus.REPORTED, IncidentStatus.IN_PROGRESS],
        },
      },
    });
    return incidents.map(serializeIncident);
  }

  async deleteIncident(id: string) {
    await this.getIncidentById(id);
    const incident = await this.prisma.incident.delete({ where: { id } });
    return serializeIncident(incident);
  }
}
