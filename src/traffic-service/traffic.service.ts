import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrafficZoneDto } from './dto/create-traffic-zone.dto';
import { TrafficDensity } from './entities/traffic-zone.entity';

@Injectable()
export class TrafficService {
  constructor(private readonly prisma: PrismaService) {}

  async createZone(createTrafficZoneDto: CreateTrafficZoneDto) {
    return this.prisma.trafficZone.create({
      data: {
        name: createTrafficZoneDto.name,
        description: createTrafficZoneDto.description,
        centerLatitude: createTrafficZoneDto.centerLatitude,
        centerLongitude: createTrafficZoneDto.centerLongitude,
        radiusKm: createTrafficZoneDto.radiusKm,
        density: (createTrafficZoneDto as any).density as TrafficDensity,
        vehicleCount: (createTrafficZoneDto as any).vehicleCount ?? 0,
        averageSpeed: (createTrafficZoneDto as any).averageSpeed ?? 0,
        lastUpdated: (createTrafficZoneDto as any).lastUpdated ?? null,
      },
    });
  }

  async getAllZones() {
    return this.prisma.trafficZone.findMany();
  }

  async getZoneById(id: string) {
    const zone = await this.prisma.trafficZone.findUnique({ where: { id } });
    if (!zone) throw new NotFoundException('Traffic zone not found');
    return zone;
  }

  async updateZoneDensity(id: string, vehicleCount: number, averageSpeed: number) {
    await this.getZoneById(id);

    const density =
      vehicleCount > 50 && averageSpeed < 10
        ? TrafficDensity.HIGH
        : vehicleCount > 30 && averageSpeed < 20
          ? TrafficDensity.MEDIUM
          : TrafficDensity.LOW;

    return this.prisma.trafficZone.update({
      where: { id },
      data: {
        vehicleCount,
        averageSpeed,
        density,
        lastUpdated: new Date(),
      },
    });
  }

  async getCongestedZones() {
    return this.prisma.trafficZone.findMany({
      where: { density: TrafficDensity.HIGH },
    });
  }

  async getZonesByDensity(density: TrafficDensity) {
    return this.prisma.trafficZone.findMany({
      where: { density },
    });
  }

  async deleteZone(id: string) {
    await this.getZoneById(id);
    return this.prisma.trafficZone.delete({ where: { id } });
  }
}
