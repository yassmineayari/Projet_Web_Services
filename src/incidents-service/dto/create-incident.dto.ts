import { IsString, IsEnum, IsNumber, IsOptional, IsArray } from 'class-validator';
import { IncidentType } from '../enums/incident.enum';

export class CreateIncidentDto {
  @IsEnum(IncidentType)
  type: IncidentType;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  @IsOptional()
  reportedBy?: string;

  @IsArray()
  @IsOptional()
  affectedRoads?: string[];
}
