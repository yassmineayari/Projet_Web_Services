import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, User } from '../schemas/auth.schema';
import { rethrowHttpServiceError } from '../http-error.util';
import { UserRole } from '../../auth-service/enums/user-role.enum';

@Resolver()
export class AuthResolver {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('role') role: UserRole,
  ) {
    const baseUrl = this.configService.getOrThrow<string>('AUTH_SERVICE_URL');
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${baseUrl}/auth/register`, {
          email,
          password,
          firstName,
          lastName,
          role,
        }),
      );
      return response.data;
    } catch (error) {
      rethrowHttpServiceError(error);
    }
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const baseUrl = this.configService.getOrThrow<string>('AUTH_SERVICE_URL');

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${baseUrl}/auth/login`, {
          email,
          password,
        }),
      );
      return response.data;
    } catch (error) {
      rethrowHttpServiceError(error);
    }
  }

  @Query(() => User)
  async validateToken(@Args('token') token: string) {
    const baseUrl = this.configService.getOrThrow<string>('AUTH_SERVICE_URL');

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${baseUrl}/auth/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error) {
      rethrowHttpServiceError(error);
    }
  }
}