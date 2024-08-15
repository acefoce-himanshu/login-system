import { verify } from '@/jwt';
import { UserService } from '@/user/user.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies.token;
    if (!token) {
      throw new UnauthorizedException();
    }
    const userId = verify(token);
    const user = await this.userService.info({ userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    request.userInfo = user;

    return true;
  }
}
