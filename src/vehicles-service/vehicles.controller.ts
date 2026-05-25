import { Controller, Post, Get, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { RecordGPSDto } from './dto/record-gps.dto';
import { Roles } from '../auth-service/roles/roles.decorator';
import { RolesGuard } from '../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../auth-service/guards/jwt-auth.guard';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get()
  async getAllVehicles() {
    return this.vehiclesService.getAllVehicles();
  }

  @Get(':id')
  async getVehicleById(@Param('id') id: string) {
    return this.vehiclesService.getVehicleById(id);
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.vehiclesService.updateVehicleStatus(id, body.status);
  }

  @Post(':id/gps')
  async recordGPS(@Param('id') vehicleId: string, @Body() recordGpsDto: RecordGPSDto) {
    return this.vehiclesService.recordGPS(vehicleId, recordGpsDto);
  }

  @Get(':id/history')
  async getHistory(@Param('id') vehicleId: string) {
    return this.vehiclesService.getVehicleHistory(vehicleId);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.deleteVehicle(id);
  }
}

