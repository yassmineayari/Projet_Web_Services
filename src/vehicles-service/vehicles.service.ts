import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { RecordGPSDto } from './dto/record-gps.dto';
import { VehicleStatus } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        plateNumber: createVehicleDto.plateNumber,
        brand: createVehicleDto.brand,
        model: createVehicleDto.model,
        type: createVehicleDto.type,
        status: (createVehicleDto as any).status ?? VehicleStatus.ACTIVE,
        currentLatitude: (createVehicleDto as any).currentLatitude ?? null,
        currentLongitude: (createVehicleDto as any).currentLongitude ?? null,
        driverId: (createVehicleDto as any).driverId ?? null,
      },
    });
  }

  async getAllVehicles() {
    return this.prisma.vehicle.findMany();
  }

  async getVehicleById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async updateVehicleStatus(id: string, status: string) {
    await this.getVehicleById(id);
    return this.prisma.vehicle.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async recordGPS(vehicleId: string, recordGpsDto: RecordGPSDto) {
    await this.getVehicleById(vehicleId);

    await this.prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        currentLatitude: recordGpsDto.latitude,
        currentLongitude: recordGpsDto.longitude,
      },
    });

    return this.prisma.gPSLocation.create({
      data: {
        vehicleId,
        latitude: recordGpsDto.latitude,
        longitude: recordGpsDto.longitude,
        speed: (recordGpsDto as any).speed ?? null,
        heading: (recordGpsDto as any).heading ?? null,
        timestamp: (recordGpsDto as any).timestamp ? new Date((recordGpsDto as any).timestamp) : new Date(),
      },
    });
  }

  async getVehicleHistory(vehicleId: string, limit: number = 100) {
    const vehicle = await this.getVehicleById(vehicleId);

    const locations = await this.prisma.gPSLocation.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });

    return { vehicle, history: locations };
  }

  async deleteVehicle(id: string) {
    await this.getVehicleById(id);
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
