import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get('user/:userId')
  async getNotificationsByUser(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationsByUser(userId);
  }

  @Get('user/:userId/unread')
  async getUnreadNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getUnreadNotifications(userId);
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    return this.notificationsService.getNotificationById(id);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch('user/:userId/read-all')
  async markAllAsRead(@Param('userId') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }

  @Delete('user/:userId')
  async deleteAllUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.deleteAllUserNotifications(userId);
  }
}
