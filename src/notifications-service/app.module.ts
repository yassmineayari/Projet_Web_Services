import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { NotificationsModule } from './notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'src', 'notifications-service', '.env'),
      ],
    }),
    NotificationsModule,
  ],
})
export class AppModule {}
