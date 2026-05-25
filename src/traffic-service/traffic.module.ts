import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TrafficController],
  providers: [TrafficService],
  exports: [TrafficService],
})
export class TrafficModule {}
