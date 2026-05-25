import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    // If no @Roles(...) => allow
    if (requiredRoles.length === 0) return true;

    // Support both HTTP and GraphQL contexts
    let request: any = null;
    try {
      const gqlCtx = GqlExecutionContext.create(context);
      request = gqlCtx.getContext()?.req;
    } catch (e) {
      // not a GraphQL context
    }

    if (!request) {
      request = context.switchToHttp().getRequest();
    }

    const user = request?.user;

    // JwtAuthGuard must run before this guard for request.user to exist
    const actualRole = user?.role;

    if (!actualRole) throw new ForbiddenException('Missing role in token');

    if (!requiredRoles.includes(actualRole)) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}

