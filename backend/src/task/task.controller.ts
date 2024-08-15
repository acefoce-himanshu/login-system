import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { GetSession } from '@/decorators/user.decorater';
import { AuthGuard } from '@/guards/auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('list')
  async list(@GetSession('userId') userId: string) {
    const tasks = await this.taskService.list(userId);
    return {
      isSuccess: true,
      tasks,
    };
  }

  @Post()
  async create(
    @GetSession('userId') userId: string,
    @Body() body: CreateTaskDto,
  ) {
    const task = await this.taskService.create(userId, body);
    return { isSuccess: true, task };
  }

  @Patch()
  async update(
    @GetSession('userId') userId: string,
    @Body() body: UpdateTaskDto,
  ) {
    const task = await this.taskService.update(userId, body);
    return { isSuccess: true, task };
  }

  @Delete(':taskId')
  async delete(
    @GetSession('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    await this.taskService.delete(userId, taskId);
    return {
      isSuccess: true,
    };
  }
}
