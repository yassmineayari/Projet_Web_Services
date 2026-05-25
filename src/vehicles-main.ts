import { bootstrapEnv } from './bootstrap-env';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './vehicles-service/app.module';

bootstrapEnv('vehicles-service');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3002;
  await app.listen(port);

  console.log(`✅ Vehicles Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start Vehicles Service:', err);
  process.exit(1);
});

