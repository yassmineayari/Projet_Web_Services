import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TrafficZone } from '../schemas/traffic.schema';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../auth-service/roles/roles.decorator';
import { RolesGuard } from '../../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../../auth-service/guards/jwt-auth.guard';

@Resolver()
export class TrafficResolver {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private get baseUrl(): string {
    return this.configService.getOrThrow<string>('TRAFFIC_SERVICE_URL');
  }

  private getAuthHeaders(context: any) {
    const request =
      context?.req ||
      context?.request ||
      context?.req?.req ||
      context?.request?.request ||
      context;
    const authHeader =
      request?.headers?.authorization || request?.headers?.Authorization;
    return authHeader ? { Authorization: authHeader } : {};
  }

  @Query(() => [TrafficZone])
  async zonesByDensity(@Args('density') density: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/traffic/zones/density/${density}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => TrafficZone)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTrafficZone(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('centerLatitude') centerLatitude: number,
    @Args('centerLongitude') centerLongitude: number,
    @Args('radiusKm') radiusKm: number,
    @Context() context: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/traffic/zones`,
        {
          name,
          description,
          centerLatitude,
          centerLongitude,
          radiusKm,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Query(() => [TrafficZone])
  async trafficZones(@Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/traffic/zones`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => TrafficZone)
  async trafficZone(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/traffic/zones/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => [TrafficZone])
  async congestedZones(@Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/traffic/zones/congested`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => TrafficZone)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateZoneDensity(
    @Args('zoneId') zoneId: string,
    @Args('vehicleCount') vehicleCount: number,
    @Args('averageSpeed') averageSpeed: number,
    @Context() context: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.baseUrl}/traffic/zones/${zoneId}/density`,
        {
          vehicleCount,
          averageSpeed,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Mutation(() => TrafficZone)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteTrafficZone(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/traffic/zones/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }
}
