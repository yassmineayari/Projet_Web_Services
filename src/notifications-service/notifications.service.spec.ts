import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PrismaService } from './prisma/prisma.service';

const mockPrisma = {
  notification: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
};

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should create a notification', async () => {
    const notification = {
      id: 'notif-1',
      userId: 'user-1',
      title: 'Hello',
      message: 'Test message',
      isRead: false,
    };

    mockPrisma.notification.create.mockResolvedValue(notification);

    const result = await service.createNotification({
      userId: 'user-1',
      title: 'Hello',
      message: 'Test message',
    } as any);

    expect(result).toEqual(notification);
  });

  it('should get notifications by user', async () => {
    const notifications = [
      { id: 'notif-1', userId: 'user-1', isRead: false },
    ];

    mockPrisma.notification.findMany.mockResolvedValue(notifications);

    const result = await service.getNotificationsByUser('user-1');

    expect(result).toEqual(notifications);
  });

  it('should get unread notifications', async () => {
    const notifications = [
      { id: 'notif-1', userId: 'user-1', isRead: false },
    ];

    mockPrisma.notification.findMany.mockResolvedValue(notifications);

    const result = await service.getUnreadNotifications('user-1');

    expect(result).toEqual(notifications);
  });

  it('should mark notification as read', async () => {
    const notification = { id: 'notif-1', userId: 'user-1', isRead: false };

    mockPrisma.notification.findUnique.mockResolvedValue(notification);
    mockPrisma.notification.update.mockResolvedValue({ ...notification, isRead: true });

    const result = await service.markAsRead('notif-1');

    expect(result.isRead).toBe(true);
    expect(mockPrisma.notification.update).toHaveBeenCalledWith({
      where: { id: 'notif-1' },
      data: { isRead: true },
    });
  });

  it('should throw when marking missing notification as read', async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null);

    await expect(service.markAsRead('unknown')).rejects.toThrow(NotFoundException);
  });

  it('should mark all notifications as read', async () => {
    const notifications = [
      { id: 'notif-1', userId: 'user-1', isRead: true },
    ];

    mockPrisma.notification.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.notification.findMany.mockResolvedValue(notifications);

    const result = await service.markAllAsRead('user-1');

    expect(result).toEqual(notifications);
  });

  it('should get a notification by id', async () => {
    const notification = { id: 'notif-1', userId: 'user-1', isRead: false };

    mockPrisma.notification.findUnique.mockResolvedValue(notification);

    const result = await service.getNotificationById('notif-1');

    expect(result).toEqual(notification);
  });

  it('should delete a notification', async () => {
    const notification = { id: 'notif-1', userId: 'user-1', isRead: false };

    mockPrisma.notification.findUnique.mockResolvedValue(notification);
    mockPrisma.notification.delete.mockResolvedValue(notification);

    const result = await service.deleteNotification('notif-1');

    expect(result).toEqual(notification);
  });

  it('should delete all notifications for a user', async () => {
    mockPrisma.notification.deleteMany.mockResolvedValue({ count: 3 });

    const result = await service.deleteAllUserNotifications('user-1');

    expect(result).toEqual({ count: 3 });
  });
});
