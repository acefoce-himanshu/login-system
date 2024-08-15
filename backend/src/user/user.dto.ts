import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
