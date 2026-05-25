import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  isRead: boolean;

  @Field({ nullable: true })
  relatedEntityId: string;

  @Field({ nullable: true })
  relatedEntityType: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

}

