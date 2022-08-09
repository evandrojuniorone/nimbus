import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested, ArrayNotEmpty } from 'class-validator';

class Module {
  @IsNotEmpty()
  id: string;

  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  pages: string[];
};

export class CreateRoleDto {
  @IsNotEmpty()
  description: string;
  
  @Type(() => Module)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  modules: Module[];
};
