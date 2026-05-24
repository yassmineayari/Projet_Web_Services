import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, User } from '../schemas/auth.schema';

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
  ) {
const baseUrl = this.configService.getOrThrow<string>('AUTH_SERVICE_URL');
console.log('AUTH_SERVICE_URL:', baseUrl);
    const response = await firstValueFrom(
      this.httpService.post(`${baseUrl}/auth/register`, {
        email,
        password,
        firstName,
        lastName,
      }),
    );

    return response.data;
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const baseUrl = this.configService.get<string>('AUTH_SERVICE_URL');

    const response = await firstValueFrom(
      this.httpService.post(`${baseUrl}/auth/login`, {
        email,
        password,
      }),
    );

    return response.data;
  }

  @Query(() => User)
  async validateToken(@Args('token') token: string) {
    const baseUrl = this.configService.get<string>('AUTH_SERVICE_URL');

    const response = await firstValueFrom(
      this.httpService.get(`${baseUrl}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    return response.data;
  }
}