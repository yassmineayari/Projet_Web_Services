import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { VehicleStatus } from '../enums/vehicle-status.enum';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;

  @IsNumber()
  @IsOptional()
  currentLatitude?: number;

  @IsNumber()
  @IsOptional()
  currentLongitude?: number;

  @IsString()
  @IsOptional()
  driverId?: string;
}
