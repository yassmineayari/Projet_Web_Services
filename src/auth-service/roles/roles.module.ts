import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [Reflector, RolesGuard],
  exports: [RolesGuard],
})
export class RolesModule {}

