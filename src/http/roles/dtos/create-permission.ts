import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsUUID(4)
  roleId: string;
  
  @IsNotEmpty()
  @IsUUID(4)
  moduleId: string;
  
  @IsNotEmpty()
  @IsUUID(4)
  pageId: string;
};
