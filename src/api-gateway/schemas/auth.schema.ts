import { ObjectType, Field, ID, Resolver, Query, Mutation, Args, GraphQLISODateTime, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '../../auth-service/enums/user-role.enum';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: UserRole;

  @Field()
  isActive: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

}


@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  expiresIn: string;

  @Field(() => User)
  user: User;
}
