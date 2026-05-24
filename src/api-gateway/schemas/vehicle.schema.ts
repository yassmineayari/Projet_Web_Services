import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field()
  currentLatitude: number;

  @Field()
  currentLongitude: number;

  @Field({ nullable: true })
  driverId: string;

  @Field()
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
