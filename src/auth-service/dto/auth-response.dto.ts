import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';

@ObjectType()
export class AuthResponseDto {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  expiresIn: string;

  @Field(() => UserDto)
  user: UserDto;
}

@ObjectType()
export class UserDto {
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
}



