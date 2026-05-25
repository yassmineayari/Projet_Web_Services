import { bootstrapEnv } from './bootstrap-env';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './incidents-service/app.module';

bootstrapEnv('incidents-service');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3004;
  await app.listen(port);

  console.log(`✅ Incidents Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start Incidents Service:', err);
  process.exit(1);
});

