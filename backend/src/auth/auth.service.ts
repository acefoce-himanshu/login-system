import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto, UserRegisterDto } from './auth.dto';
import { UserModel } from '@/db/user.schema';
import * as bcrypt from 'bcrypt';
import { sign } from '@/jwt';

@Injectable()
export class AuthService {
  async register({ email, name, password }: UserRegisterDto) {
    const alreadyExists = await UserModel.findOne({
      email: email,
      status: {
        $in: ['ACTIVE'],
      },
    });
    if (alreadyExists) {
      throw new ConflictException('EMAIL_ALREADY_TAKEN');
    }
    const salt = await bcrypt.genSalt(5);
    const hasedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      email,
      name,
      password: hasedPassword,
      status: 'ACTIVE',
    });

    const token = sign(user);
    return token;
  }

  async login({ email, password }: UserLoginDto) {
    const user = await UserModel.findOne({
      email: email,
      status: {
        $in: ['ACTIVE'],
      },
    }).lean();

    if (!user) {
      throw new NotFoundException('EMAIL_ID_NOT_FOUND');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('INVALID_PASSWORD');
    }

    const token = sign(user);

    return token;
  }
}
