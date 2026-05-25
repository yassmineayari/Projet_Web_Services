import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AuthResolver } from './resolvers/auth.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { TrafficResolver } from './resolvers/traffic.resolver';
import { IncidentResolver } from './resolvers/incident.resolver';
import { NotificationResolver } from './resolvers/notification.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'src', 'api-gateway', '.env'),
      ],
    }),

    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [
    AuthResolver,
    VehicleResolver,
    TrafficResolver,
    IncidentResolver,
    NotificationResolver,
  ],
})
export class ApiGatewayModule {}