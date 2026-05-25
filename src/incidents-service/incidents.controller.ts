import { Controller, Post, Get, Param, Patch, Delete, UseGuards, Body } from '@nestjs/common';

import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentStatusDto } from './dto/update-incident-status.dto';
import { Roles } from '../auth-service/roles/roles.decorator';
import { RolesGuard } from '../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../auth-service/guards/jwt-auth.guard';

@Controller('incidents')
export class IncidentsController {
  constructor(private incidentsService: IncidentsService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createIncident(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentsService.createIncident(createIncidentDto);
  }

  @Get()
  async getAllIncidents() {
    return this.incidentsService.getAllIncidents();
  }

  @Get('active')
  async getActiveIncidents() {
    return this.incidentsService.getActiveIncidents();
  }

  @Get(':id')
  async getIncidentById(@Param('id') id: string) {
    return this.incidentsService.getIncidentById(id);
  }

  @Patch(':id/status')
  @Roles('OPERATOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateIncidentStatusDto: UpdateIncidentStatusDto,
  ) {
    return this.incidentsService.updateIncidentStatus(id, updateIncidentStatusDto);
  }

  @Patch(':id/assign')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignIncident(@Param('id') id: string, @Body() body: { assignedTo: string }) {
    return this.incidentsService.assignIncident(id, body.assignedTo);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteIncident(@Param('id') id: string) {
    return this.incidentsService.deleteIncident(id);
  }
}

