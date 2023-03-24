import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
