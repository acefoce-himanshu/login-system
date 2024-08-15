import { InferSchemaType, Schema, Types } from 'mongoose';
import { connections } from './connections';

const USER_STATUS = ['ACTIVE', 'INACTIVE', 'UNVERIFIED'] as const;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: USER_STATUS,
    required: true,
  },
});

export type User = InferSchemaType<typeof UserSchema>;
export type UserDoc = Omit<User, 'password'> & {
  _id: Types.ObjectId;
};
export const UserModel = connections.DEFAULT.model('user', UserSchema);
