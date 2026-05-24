import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationsModule,
  ],
})
export class AppModule {}
