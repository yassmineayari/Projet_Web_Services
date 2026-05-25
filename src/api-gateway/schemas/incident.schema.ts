import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Incident {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field({ nullable: true })
  reportedBy: string;

  @Field({ nullable: true })
  assignedTo: string;

  @Field({ nullable: true })
  resolvedAt: Date;

  @Field(() => [String], { nullable: true })
  affectedRoads: string[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

}

