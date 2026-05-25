import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Notification } from '../schemas/notification.schema';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../auth-service/roles/roles.decorator';
import { RolesGuard } from '../../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../../auth-service/guards/jwt-auth.guard';

@Resolver()
export class NotificationResolver {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private get baseUrl(): string {
    return this.configService.getOrThrow<string>('NOTIFICATIONS_SERVICE_URL');
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

  @Query(() => [Notification])
  async notificationsByUser(@Args('userId') userId: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/notifications/user/${userId}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => [Notification])
  async unreadNotifications(@Args('userId') userId: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/notifications/user/${userId}/unread`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Query(() => Notification)
  async notification(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/notifications/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => Notification)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async markNotificationAsRead(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.baseUrl}/notifications/${id}/read`, null, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => [Notification])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async markAllNotificationsAsRead(@Args('userId') userId: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.baseUrl}/notifications/user/${userId}/read-all`, null, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }

  @Mutation(() => Notification)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteNotification(@Args('id') id: string, @Context() context: any) {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/notifications/${id}`, {
        headers: this.getAuthHeaders(context),
      }),
    );
    return response.data;
  }
}
