import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: createNotificationDto.userId,
        type: (createNotificationDto as any).type,
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        isRead: (createNotificationDto as any).isRead ?? false,
        relatedEntityId: (createNotificationDto as any).relatedEntityId ?? null,
        relatedEntityType: (createNotificationDto as any).relatedEntityType ?? null,
      },
    });
  }

  async getNotificationsByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUnreadNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    return this.getNotificationsByUser(userId);
  }

  async getNotificationById(id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async deleteNotification(id: string) {
    await this.getNotificationById(id);
    return this.prisma.notification.delete({ where: { id } });
  }

  async deleteAllUserNotifications(userId: string) {
    // deleteMany returns { count }
    return this.prisma.notification.deleteMany({ where: { userId } });
  }
}
