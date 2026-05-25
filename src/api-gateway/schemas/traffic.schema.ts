import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class TrafficZone {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  centerLatitude: number;

  @Field()
  centerLongitude: number;

  @Field()
  radiusKm: number;

  @Field()
  density: string;

  @Field()
  vehicleCount: number;

  @Field()
  averageSpeed: number;

  @Field({ nullable: true })
  lastUpdated: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

}

