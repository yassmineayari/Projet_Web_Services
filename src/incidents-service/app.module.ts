import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IncidentsModule } from './incidents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    IncidentsModule,
  ],
})
export class AppModule {}