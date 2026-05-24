import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { TrafficModule } from './traffic.module';

async function bootstrap() {
  const app = await NestFactory.create(TrafficModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3003;
  await app.listen(port);

  console.log(`✅ Traffic Service running on http://localhost:${port}`);
}

bootstrap();
