import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentStatus, IncidentType } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentStatusDto } from './dto/update-incident-status.dto';

@Injectable()
export class IncidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createIncident(createIncidentDto: CreateIncidentDto) {
    return this.prisma.incident.create({
      data: {
        ...createIncidentDto,
        affectedRoads: createIncidentDto.affectedRoads,
      },
    });
  }

  async getAllIncidents() {
    return this.prisma.incident.findMany();
  }

  async getIncidentById(id: string) {
    const incident = await this.prisma.incident.findUnique({ where: { id } });
    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async getIncidentsByStatus(status: IncidentStatus) {
    return this.prisma.incident.findMany({ where: { status } });
  }

  async getIncidentsByType(type: IncidentType) {
    return this.prisma.incident.findMany({ where: { type } });
  }

  async updateIncidentStatus(id: string, updateIncidentStatusDto: UpdateIncidentStatusDto) {
    const incident = await this.getIncidentById(id);

    const data: any = { status: updateIncidentStatusDto.status };
    if (updateIncidentStatusDto.status === IncidentStatus.RESOLVED) {
      data.resolvedAt = new Date();
    }

    return this.prisma.incident.update({
      where: { id },
      data,
    });
  }

  async assignIncident(id: string, assignedTo: string) {
    await this.getIncidentById(id);

    return this.prisma.incident.update({
      where: { id },
      data: { assignedTo },
    });
  }

  async getActiveIncidents() {
    return this.prisma.incident.findMany({
      where: {
        status: {
          in: [IncidentStatus.REPORTED, IncidentStatus.IN_PROGRESS],
        },
      },
    });
  }

  async deleteIncident(id: string) {
    await this.getIncidentById(id);
    return this.prisma.incident.delete({ where: { id } });
  }
}
