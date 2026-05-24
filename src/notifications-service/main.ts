import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3005;
  await app.listen(port);

  console.log(`✅ Notifications Service running on http://localhost:${port}`);
}

bootstrap();
