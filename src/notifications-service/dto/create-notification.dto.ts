import { IsString, IsEnum } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  relatedEntityId?: string;

  @IsString()
  relatedEntityType?: string;
}
