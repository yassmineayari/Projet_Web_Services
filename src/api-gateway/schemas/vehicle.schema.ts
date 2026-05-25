import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id: string;

  @Field()
  plateNumber: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  currentLatitude?: number;

  @Field({ nullable: true })
  currentLongitude?: number;

  @Field({ nullable: true })
  driverId: string;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

}


@ObjectType()
export class GPSLocation {
  @Field(() => ID)
  id: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field({ nullable: true })
  speed: number;

  @Field({ nullable: true })
  heading: number;

  @Field()
  timestamp: Date;
}

@ObjectType()
export class VehicleHistory {
  @Field(() => Vehicle)
  vehicle: Vehicle;

  @Field(() => [GPSLocation])
  history: GPSLocation[];
}
