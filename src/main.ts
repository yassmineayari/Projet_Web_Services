import { bootstrapEnv } from './bootstrap-env';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

bootstrapEnv('api-gateway');

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.API_GATEWAY_PORT || 3000;
  await app.listen(port);

  console.log(`🚀 API Gateway running on http://localhost:${port}/graphql`);
}

bootstrap();
