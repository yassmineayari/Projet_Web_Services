import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Vehicle, GPSLocation, VehicleHistory } from '../schemas/vehicle.schema';

@Resolver()
export class VehicleResolver {
  constructor(private httpService: HttpService) {}

  @Mutation(() => Vehicle)
  async createVehicle(
    @Args('plateNumber') plateNumber: string,
    @Args('brand') brand: string,
    @Args('model') model: string,
    @Args('type') type: string,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.VEHICLES_SERVICE_URL}/vehicles`, {
        plateNumber,
        brand,
        model,
        type,
      }),
    );
    return response.data;
  }

  @Query(() => [Vehicle])
  async vehicles() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.VEHICLES_SERVICE_URL}/vehicles`),
    );
    return response.data;
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.VEHICLES_SERVICE_URL}/vehicles/${id}`),
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
  ) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.VEHICLES_SERVICE_URL}/vehicles/${vehicleId}/gps`, {
        latitude,
        longitude,
        speed,
        heading,
      }),
    );
    return response.data;
  }

  @Query(() => VehicleHistory)
  async vehicleHistory(@Args('vehicleId') vehicleId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.VEHICLES_SERVICE_URL}/vehicles/${vehicleId}/history`),
    );
    return response.data;
  }

  @Mutation(() => Vehicle)
  async updateVehicleStatus(
    @Args('vehicleId') vehicleId: string,
    @Args('status') status: string,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(`${process.env.VEHICLES_SERVICE_URL}/vehicles/${vehicleId}/status`, {
        status,
      }),
    );
    return response.data;
  }

  @Mutation(() => Vehicle)
  async deleteVehicle(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(`${process.env.VEHICLES_SERVICE_URL}/vehicles/${id}`),
    );
    return response.data;
  }
}
