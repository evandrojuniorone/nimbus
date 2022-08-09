import { IsBoolean, IsNotEmpty, IsEmail, IsDefined } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  password?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  sellerCode: string;

  @IsNotEmpty()
  @IsBoolean()
  manager: boolean;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  roleId: string;
};
