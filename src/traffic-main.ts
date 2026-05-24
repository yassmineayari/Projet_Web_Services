import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './traffic-service/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3003;
  await app.listen(port);

  console.log(`✅ Traffic Service running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start Traffic Service:', err);
  process.exit(1);
});

