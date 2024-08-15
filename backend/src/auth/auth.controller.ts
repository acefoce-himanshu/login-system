import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegisterDto } from './auth.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserLoginDto, @Res() res: Response) {
    const token = await this.authService.login(body);
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.json({
      isSuccess: true,
    });
  }

  @Post('register')
  async register(@Body() body: UserRegisterDto, @Res() res: Response) {
    const token = await this.authService.register(body);
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.json({
      isSuccess: true,
    });
  }

  @Get('logout')
  async logoout(@Res() res: Response) {
    res.clearCookie('token');
    res.json({
      isSuccess: true,
    });
  }
}
