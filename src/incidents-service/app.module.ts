import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { IncidentsModule } from './incidents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'src', 'incidents-service', '.env'),
      ],
    }),
    IncidentsModule,
  ],
})
export class AppModule {}