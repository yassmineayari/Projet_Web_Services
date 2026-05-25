import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Vehicle, GPSLocation, VehicleHistory } from '../schemas/vehicle.schema';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../auth-service/roles/roles.decorator';
import { RolesGuard } from '../../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../../auth-service/guards/jwt-auth.guard';

@Resolver()
export class VehicleResolver {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private get baseUrl(): string {
    return this.configService.getOrThrow<string>('VEHICLES_SERVICE_URL');
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

  @Mutation(() => Vehicle)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createVehicle(
    @Args('plateNumber') plateNumber: string,
    @Args('brand') brand: string,
    @Args('model') model: string,
    @Args('type') type: string,
    @Context() context: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/vehicles`,
        {
          plateNumber,
          brand,
          model,
          type,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Query(() => [Vehicle])
  async vehicles(@Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/vehicles`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id') id: string, @Context() context?: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/vehicles/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => GPSLocation)
  async recordGPS(
    @Args('vehicleId') vehicleId: string,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
    @Args('speed', { nullable: true }) speed?: number,
    @Args('heading', { nullable: true }) heading?: number,
    @Context() context?: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/vehicles/${vehicleId}/gps`,
        {
          latitude,
          longitude,
          speed,
          heading,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Query(() => VehicleHistory)
  async vehicleHistory(@Args('vehicleId') vehicleId: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/vehicles/${vehicleId}/history`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => Vehicle)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateVehicleStatus(
    @Args('vehicleId') vehicleId: string,
    @Args('status') status: string,
    @Context() context?: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.baseUrl}/vehicles/${vehicleId}/status`,
        {
          status,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Mutation(() => Vehicle)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteVehicle(@Args('id') id: string, @Context() context?: any) {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/vehicles/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }
}
