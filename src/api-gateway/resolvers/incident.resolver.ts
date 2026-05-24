import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Incident } from '../schemas/incident.schema';

@Resolver()
export class IncidentResolver {
  constructor(private httpService: HttpService) {}

  @Mutation(() => Incident)
  async createIncident(
    @Args('type') type: string,
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
    @Args('reportedBy', { nullable: true }) reportedBy?: string,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.INCIDENTS_SERVICE_URL}/incidents`, {
        type,
        title,
        description,
        latitude,
        longitude,
        reportedBy,
      }),
    );
    return response.data;
  }

  @Query(() => [Incident])
  async incidents() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.INCIDENTS_SERVICE_URL}/incidents`),
    );
    return response.data;
  }

  @Query(() => [Incident])
  async activeIncidents() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.INCIDENTS_SERVICE_URL}/incidents/active`),
    );
    return response.data;
  }

  @Query(() => Incident)
  async incident(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.INCIDENTS_SERVICE_URL}/incidents/${id}`),
    );
    return response.data;
  }

  @Mutation(() => Incident)
  async updateIncidentStatus(
    @Args('incidentId') incidentId: string,
    @Args('status') status: string,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${process.env.INCIDENTS_SERVICE_URL}/incidents/${incidentId}/status`,
        { status },
      ),
    );
    return response.data;
  }

  @Mutation(() => Incident)
  async assignIncident(
    @Args('incidentId') incidentId: string,
    @Args('assignedTo') assignedTo: string,
  ) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${process.env.INCIDENTS_SERVICE_URL}/incidents/${incidentId}/assign`,
        { assignedTo },
      ),
    );
    return response.data;
  }

  @Mutation(() => Incident)
  async deleteIncident(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(`${process.env.INCIDENTS_SERVICE_URL}/incidents/${id}`),
    );
    return response.data;
  }
}
