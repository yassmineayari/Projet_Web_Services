jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt') as {
  hash: jest.Mock;
  compare: jest.Mock;
};

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'OPERATOR',
      isActive: true,
      createdAt: new Date('2025-01-01'),
      password: 'hashed',
    });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');
    mockJwtService.sign.mockReturnValueOnce('access-token').mockReturnValueOnce('refresh-token');

    const result = await service.register({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'OPERATOR',
    } as any);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(mockPrisma.user.create).toHaveBeenCalled();
    expect(result.accessToken).toBe('access-token');
    expect(result.refreshToken).toBe('refresh-token');
    expect(result.user.email).toBe('test@example.com');
  });

  it('should throw when registering with existing email', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ email: 'test@example.com' });

    await expect(
      service.register({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'OPERATOR',
      } as any),
    ).rejects.toThrow(BadRequestException);
  });

  it('should login successfully with valid credentials', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'OPERATOR',
      isActive: true,
      password: 'hashed-password',
      createdAt: new Date('2025-01-01'),
    });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    mockJwtService.sign.mockReturnValueOnce('access-token').mockReturnValueOnce('refresh-token');

    const result = await service.login({ email: 'test@example.com', password: 'password123' } as any);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(result.accessToken).toBe('access-token');
    expect(result.user.id).toBe('user-1');
  });

  it('should throw when login credentials are invalid', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(service.login({ email: 'bad@example.com', password: 'wrong' } as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should validate a token and return user when valid', async () => {
    const payload = { sub: 'user-1', email: 'test@example.com', role: 'OPERATOR' };
    mockJwtService.verify.mockReturnValue(payload);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'OPERATOR',
      isActive: true,
    });

    const result = await service.validateToken('valid-token');

    expect(mockJwtService.verify).toHaveBeenCalledWith('valid-token');
    expect(result.id).toBe('user-1');
  });

  it('should throw when getUserById does not exist', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(service.getUserById('unknown')).rejects.toThrow(UnauthorizedException);
  });
});
