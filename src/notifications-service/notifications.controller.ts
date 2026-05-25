import { Controller, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Roles } from '../auth-service/roles/roles.decorator';
import { RolesGuard } from '../auth-service/roles/roles.guard';
import { JwtAuthGuard } from '../auth-service/guards/jwt-auth.guard';

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
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }

  @Delete('user/:userId')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteAllUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.deleteAllUserNotifications(userId);
  }
}

