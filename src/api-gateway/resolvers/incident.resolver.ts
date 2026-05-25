import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Incident } from '../schemas/incident.schema';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../auth-service/roles/roles.decorator';
import { RolesGuard } from '../../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../../auth-service/guards/jwt-auth.guard';

@Resolver()
export class IncidentResolver {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private get baseUrl(): string {
    return this.configService.getOrThrow<string>('INCIDENTS_SERVICE_URL');
  }

  private getAuthHeaders(context: any) {
    const request =
      context?.req ||
      context?.request ||
      context?.req?.req ||
      context?.request?.request ||
      context;
    const authHeader =
      request?.headers?.authorization || request?.headers?.Authorization;
    return authHeader ? { Authorization: authHeader } : {};
  }

  @Mutation(() => Incident)
  @Roles('OPERATOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createIncident(
    @Args('type') type: string,
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
    @Args('reportedBy', { nullable: true }) reportedBy?: string,
    @Context() context?: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/incidents`,
        {
          type,
          title,
          description,
          latitude,
          longitude,
          reportedBy,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Query(() => [Incident])
  async incidents(@Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/incidents`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => [Incident])
  async activeIncidents(@Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/incidents/active`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => Incident)
  async incident(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/incidents/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => Incident)
  @Roles('OPERATOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateIncidentStatus(
    @Args('incidentId') incidentId: string,
    @Args('status') status: string,
    @Context() context?: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.baseUrl}/incidents/${incidentId}/status`,
        {
          status,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Mutation(() => Incident)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignIncident(
    @Args('incidentId') incidentId: string,
    @Args('assignedTo') assignedTo: string,
    @Context() context?: any,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.baseUrl}/incidents/${incidentId}/assign`,
        {
          assignedTo,
        },
        { headers: this.getAuthHeaders(context) },
      ),
    );
    return response.data;
  }

  @Mutation(() => Incident)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteIncident(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/incidents/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }
}
