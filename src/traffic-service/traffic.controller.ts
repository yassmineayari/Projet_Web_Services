import { Controller, Post, Get, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { CreateTrafficZoneDto } from './dto/create-traffic-zone.dto';
import { TrafficDensity } from './enums/traffic-density.enum';
import { Roles } from '../auth-service/roles/roles.decorator';
import { RolesGuard } from '../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../auth-service/guards/jwt-auth.guard';

@Controller('traffic')
export class TrafficController {
  constructor(private trafficService: TrafficService) {}

  @Post('zones')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createZone(@Body() createTrafficZoneDto: CreateTrafficZoneDto) {
    return this.trafficService.createZone(createTrafficZoneDto);
  }

  @Get('zones/density/:density')
  async getZonesByDensity(@Param('density') density: string) {
    return this.trafficService.getZonesByDensity(density as TrafficDensity);
  }

  @Get('zones')
  async getAllZones() {
    return this.trafficService.getAllZones();
  }

  @Get('zones/congested')
  async getCongestedZones() {
    return this.trafficService.getCongestedZones();
  }

  @Get('zones/:id')
  async getZoneById(@Param('id') id: string) {
    return this.trafficService.getZoneById(id);
  }

  @Patch('zones/:id/density')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateZoneDensity(
    @Param('id') id: string,
    @Body() body: { vehicleCount: number; averageSpeed: number },
  ) {
    return this.trafficService.updateZoneDensity(id, body.vehicleCount, body.averageSpeed);
  }

  @Delete('zones/:id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteZone(@Param('id') id: string) {
    return this.trafficService.deleteZone(id);
  }
}

