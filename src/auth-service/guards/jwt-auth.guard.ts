import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
});

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token missing');
    }

    let payload: any;
    try {
      payload = jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    return true;
  }

  private getRequest(context: ExecutionContext): any {
    try {
      const gqlContext = GqlExecutionContext.create(context);
      const ctx = gqlContext.getContext();
      if (ctx?.req) return ctx.req;
      if (ctx?.request) return ctx.request;
      if (ctx?.headers) return { headers: ctx.headers };
      return ctx;
    } catch {
      const httpRequest = context.switchToHttp().getRequest();
      if (httpRequest) return httpRequest;
      const args = context.getArgs();
      const graphqlContext = args?.[2];
      if (graphqlContext?.req) return graphqlContext.req;
      if (graphqlContext?.request) return graphqlContext.request;
      if (graphqlContext?.headers) return { headers: graphqlContext.headers };
      return null;
    }
  }

  private extractToken(request: any): string | null {
    const headers =
      request?.headers ||
      request?.req?.headers ||
      request?.request?.headers ||
      request?.context?.headers ||
      request?.headers?.headers;
    const authHeader = headers?.authorization || headers?.Authorization;
    if (!authHeader) return null;
    const [, token] = authHeader.split(' ');
    return token || null;
  }
}
