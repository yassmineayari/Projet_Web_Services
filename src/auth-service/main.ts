import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3001;
  await app.listen(port);

  console.log(`✅ Auth Service running on http://localhost:${port}`);
}

bootstrap();
