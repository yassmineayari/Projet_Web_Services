import { bootstrapEnv } from './bootstrap-env';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './auth-service/app.module';

bootstrapEnv('auth-service');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3001;
  await app.listen(port);

  console.log(`✅ Auth Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start Auth Service:', err);
  process.exit(1);
});

