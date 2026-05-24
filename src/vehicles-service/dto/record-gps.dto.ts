import { IsNumber, IsOptional } from 'class-validator';

export class RecordGPSDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  @IsOptional()
  speed?: number;

  @IsNumber()
  @IsOptional()
  heading?: number;
}
