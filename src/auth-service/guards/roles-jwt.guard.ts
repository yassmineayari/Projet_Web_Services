import { Injectable } from '@nestjs/common';
import { RolesGuard } from '../roles/roles.guard';

// Simple alias for backwards compatibility.
@Injectable()
export class JwtRolesGuard extends RolesGuard {}



