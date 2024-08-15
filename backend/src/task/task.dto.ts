import { TASK_STATUS, TaskStatus } from '@/db/task.schema';
import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  content!: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  id!: string;

  @IsOptional()
  @IsIn(TASK_STATUS)
  status?: TaskStatus;
}
