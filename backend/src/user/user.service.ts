import { UserModel } from '@/db/user.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserUpdateDto } from './user.dto';

@Injectable()
export class UserService {
  async info({ userId }: { userId: string }) {
    const user = await UserModel.findOne({
      _id: new Types.ObjectId(userId),
      status: 'ACTIVE',
    })
      .select('-password')
      .lean();

    if (!user) {
      return null;
    }

    return user;
  }

  async update({ userId }: { userId: string }, { email, name }: UserUpdateDto) {
    if (email) {
      const existingUser = await UserModel.findOne({
        status: 'ACTIVE',
        email: email,
      }).lean();

      if (existingUser && existingUser._id.toString() !== userId) {
        throw new ConflictException('EMAIL_ALREADY_TAKEN');
      }
    }

    const user = await UserModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(userId),
        status: 'ACTIVE',
      },
      {
        $set: {
          name: name,
          email: email,
        },
      },
      {
        new: true,
      },
    )
      .select('-password')
      .lean();

    if (!user) {
      return null;
    }

    return user;
  }
}
