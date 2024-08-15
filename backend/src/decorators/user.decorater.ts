import { UserDoc } from '@/db/user.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUserInfo = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext): Promise<UserDoc> => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.userInfo!;
  },
);

export const GetSession = createParamDecorator(
  async (field: 'userId', ctx: ExecutionContext): Promise<string> => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.userInfo!._id.toString();
  },
);
