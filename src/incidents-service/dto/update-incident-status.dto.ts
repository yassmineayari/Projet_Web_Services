import { IsEnum } from 'class-validator';
import { IncidentStatus } from '../enums/incident.enum';

export class UpdateIncidentStatusDto {
  @IsEnum(IncidentStatus)
  status: IncidentStatus;
}
