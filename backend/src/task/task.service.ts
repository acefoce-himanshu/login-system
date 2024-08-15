import { TaskModel } from '@/db/task.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  async list(userId: string) {
    const tasks = await TaskModel.find({
      userId: new Types.ObjectId(userId),
      status: {
        $in: ['ACTIVE', 'COMPLETED'],
      },
    }).lean();
    return tasks;
  }

  async create(userId: string, { content }: CreateTaskDto) {
    const task = await TaskModel.create({
      userId: new Types.ObjectId(userId),
      content,
      status: 'ACTIVE',
    });
    return task.toObject();
  }

  async update(userId: string, { id, content, status }: UpdateTaskDto) {
    const task = await TaskModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
        status: {
          $in: ['ACTIVE', 'COMPLETED'],
        },
      },
      {
        $set: {
          content,
          status,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!task) {
      throw new NotFoundException('TASK_NOT_FOUND');
    }

    return task;
  }

  async delete(userId: string, id: string) {
    const task = await TaskModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
        status: {
          $in: ['ACTIVE', 'COMPLETED'],
        },
      },
      {
        $set: {
          status: 'DELETED',
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!task) {
      throw new NotFoundException('TASK_NOT_FOUND');
    }
  }
}
