import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../generated/client';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): undefined | User => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: User }>();
    return request.user;
  },
);
