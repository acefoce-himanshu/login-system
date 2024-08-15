import { UserDoc } from '@/db/user.schema';
import { GetSession, GetUserInfo } from '@/decorators/user.decorater';
import { AuthGuard } from '@/guards/auth.guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async info(@GetUserInfo() user: UserDoc) {
    return { user, isSuccess: true };
  }

  @Patch()
  async update(
    @GetSession('userId') userId: string,
    @Body() body: UserUpdateDto,
  ) {
    const user = await this.userService.update({ userId }, body);
    return {
      isSuccess: true,
      user,
    };
  }
}
