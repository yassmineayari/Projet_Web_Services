import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { VehiclesModule } from './vehicles.module';

async function bootstrap() {
  const app = await NestFactory.create(VehiclesModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3002;
  await app.listen(port);

  console.log(`✅ Vehicles Service running on http://localhost:${port}`);
}

bootstrap();
