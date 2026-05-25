import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { VehiclesModule } from './vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'src', 'vehicles-service', '.env'),
      ],
    }),
    VehiclesModule,
  ],
})
export class AppModule {}