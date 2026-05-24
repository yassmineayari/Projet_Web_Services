import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TrafficZone } from '../schemas/traffic.schema';

@Resolver()
export class TrafficResolver {
  constructor(private httpService: HttpService) {}

  @Mutation(() => TrafficZone)
  async createTrafficZone(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('centerLatitude') centerLatitude: number,
    @Args('centerLongitude') centerLongitude: number,
    @Args('radiusKm') radiusKm: number,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.TRAFFIC_SERVICE_URL}/traffic/zones`, {
        name,
        description,
        centerLatitude,
        centerLongitude,
        radiusKm,
      }),
    );
    return response.data;
  }

  @Query(() => [TrafficZone])
  async trafficZones() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.TRAFFIC_SERVICE_URL}/traffic/zones`),
    );
    return response.data;
  }

  @Query(() => TrafficZone)
  async trafficZone(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.TRAFFIC_SERVICE_URL}/traffic/zones/${id}`),
    );
    return response.data;
  }

  @Query(() => [TrafficZone])
  async congestedZones() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.TRAFFIC_SERVICE_URL}/traffic/zones/congested`),
    );
    return response.data;
  }

  @Mutation(() => TrafficZone)
  async updateZoneDensity(
    @Args('zoneId') zoneId: string,
    @Args('vehicleCount') vehicleCount: number,
    @Args('averageSpeed') averageSpeed: number,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(`${process.env.TRAFFIC_SERVICE_URL}/traffic/zones/${zoneId}/density`, {
        vehicleCount,
        averageSpeed,
      }),
    );
    return response.data;
  }

  @Mutation(() => TrafficZone)
  async deleteTrafficZone(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(`${process.env.TRAFFIC_SERVICE_URL}/traffic/zones/${id}`),
    );
    return response.data;
  }
}
