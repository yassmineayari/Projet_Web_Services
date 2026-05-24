import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrafficModule } from './traffic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TrafficModule,
  ],
})
export class AppModule {}