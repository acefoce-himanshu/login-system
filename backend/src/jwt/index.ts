import { JWT_SECRET } from '@/config';
import { User } from '@/db/user.schema';
import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const sign = (
  user: User & {
    _id: Types.ObjectId;
  },
) => {
  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    JWT_SECRET,
  );

  return token;
};

export const verify = (token: string) => {
  const payload = jwt.verify(token, JWT_SECRET) as {
    userId: string;
  };
  return payload.userId;
};
