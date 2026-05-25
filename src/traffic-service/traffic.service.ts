import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { serializeTrafficZone } from '../prisma/serialize';
import { CreateTrafficZoneDto } from './dto/create-traffic-zone.dto';
import { TrafficDensity } from './enums/traffic-density.enum';

@Injectable()
export class TrafficService {
  constructor(private readonly prisma: PrismaService) {}

  async createZone(createTrafficZoneDto: CreateTrafficZoneDto) {
    const zone = await this.prisma.trafficZone.create({
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
    return serializeTrafficZone(zone);
  }

  async getAllZones() {
    const zones = await this.prisma.trafficZone.findMany();
    return zones.map(serializeTrafficZone);
  }

  async getZoneById(id: string) {
    const zone = await this.prisma.trafficZone.findUnique({ where: { id } });
    if (!zone) throw new NotFoundException('Traffic zone not found');
    return serializeTrafficZone(zone);
  }

  async updateZoneDensity(id: string, vehicleCount: number, averageSpeed: number) {
    await this.getZoneById(id);

    const density =
      vehicleCount > 50 && averageSpeed < 10
        ? TrafficDensity.HIGH
        : vehicleCount > 30 && averageSpeed < 20
          ? TrafficDensity.MEDIUM
          : TrafficDensity.LOW;

    const zone = await this.prisma.trafficZone.update({
      where: { id },
      data: {
        vehicleCount,
        averageSpeed,
        density,
        lastUpdated: new Date(),
      },
    });
    return serializeTrafficZone(zone);
  }

  async getCongestedZones() {
    const zones = await this.prisma.trafficZone.findMany({
      where: { density: TrafficDensity.HIGH },
    });
    return zones.map(serializeTrafficZone);
  }

  async getZonesByDensity(density: TrafficDensity) {
    const zones = await this.prisma.trafficZone.findMany({
      where: { density },
    });
    return zones.map(serializeTrafficZone);
  }

  async deleteZone(id: string) {
    await this.getZoneById(id);
    const zone = await this.prisma.trafficZone.delete({ where: { id } });
    return serializeTrafficZone(zone);
  }
}
