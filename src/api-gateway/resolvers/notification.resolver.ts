import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Notification } from '../schemas/notification.schema';

@Resolver()
export class NotificationResolver {
  constructor(private httpService: HttpService) {}

  @Query(() => [Notification])
  async notificationsByUser(@Args('userId') userId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/user/${userId}`),
    );
    return response.data;
  }

  @Query(() => [Notification])
  async unreadNotifications(@Args('userId') userId: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/user/${userId}/unread`,
      ),
    );
    return response.data;
  }

  @Query(() => Notification)
  async notification(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/${id}`),
    );
    return response.data;
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.patch(`${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/${id}/read`),
    );
    return response.data;
  }

  @Mutation(() => [Notification])
  async markAllNotificationsAsRead(@Args('userId') userId: string) {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/user/${userId}/read-all`,
      ),
    );
    return response.data;
  }

  @Mutation(() => Notification)
  async deleteNotification(@Args('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(`${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/${id}`),
    );
    return response.data;
  }
}
