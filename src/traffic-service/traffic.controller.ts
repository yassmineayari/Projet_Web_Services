import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { CreateTrafficZoneDto } from './dto/create-traffic-zone.dto';

@Controller('traffic')
export class TrafficController {
  constructor(private trafficService: TrafficService) {}

  @Post('zones')
  async createZone(@Body() createTrafficZoneDto: CreateTrafficZoneDto) {
    return this.trafficService.createZone(createTrafficZoneDto);
  }

  @Get('zones')
  async getAllZones() {
    return this.trafficService.getAllZones();
  }

  @Get('zones/:id')
  async getZoneById(@Param('id') id: string) {
    return this.trafficService.getZoneById(id);
  }

  @Get('zones/congested')
  async getCongestedZones() {
    return this.trafficService.getCongestedZones();
  }

  @Patch('zones/:id/density')
  async updateZoneDensity(
    @Param('id') id: string,
    @Body() body: { vehicleCount: number; averageSpeed: number },
  ) {
    return this.trafficService.updateZoneDensity(id, body.vehicleCount, body.averageSpeed);
  }

  @Delete('zones/:id')
  async deleteZone(@Param('id') id: string) {
    return this.trafficService.deleteZone(id);
  }
}
