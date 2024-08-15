import { InferSchemaType, Schema, Types } from 'mongoose';
import { connections } from './connections';

export const TASK_STATUS = ['ACTIVE', 'COMPLETED', 'DELETED'] as const;

const TaskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: TASK_STATUS,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export type Task = InferSchemaType<typeof TaskSchema> & {
  _id: Types.ObjectId;
};

export const TaskModel = connections.DEFAULT.model('task', TaskSchema);
export type TaskStatus = (typeof TASK_STATUS)[number];
