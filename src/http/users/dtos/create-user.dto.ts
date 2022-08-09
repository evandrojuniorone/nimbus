import { IsBoolean, IsNotEmpty, IsEmail, IsDefined, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

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
  @IsUUID(4)
  roleId: string;
};
