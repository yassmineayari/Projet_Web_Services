import { IsString, IsNumber } from 'class-validator';

export class CreateTrafficZoneDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  centerLatitude: number;

  @IsNumber()
  centerLongitude: number;

  @IsNumber()
  radiusKm: number;
}
