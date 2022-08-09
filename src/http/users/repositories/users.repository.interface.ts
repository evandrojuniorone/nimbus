import { User } from '@http/users/models/user.model';

import { CreateUserDto } from '@http/users/dtos/create-user.dto';
import { UpdateUserDto } from '@http/users/dtos/update-user.dto';

export type UsersFilter = {
  name?: string;
  username?: string;
  active?: boolean;
  roleId?: string;
  page?: number;
  size?: number;
};

export interface IUsersRepository {
  findOne: (id: string, schema: string) => Promise<User>;
  findOneByUsername: (username: string, schema: string) => Promise<User>;
  findOneByEmail: (email: string, schema: string) => Promise<User>;
  findOneBySellerCode: (sellerCode: string, schema: string) => Promise<User>;
  findMany: (filter: UsersFilter, schema: string) => Promise<User[]>;
  create: (user: CreateUserDto, schema: string) => Promise<User>;
  update: (id: string, user: UpdateUserDto, schema: string) => Promise<boolean>;
  delete: (id: string, schema: string) => Promise<boolean>;
  deleteMany: (ids: string[], schema: string) => Promise<boolean>;
  count: (filter: UsersFilter, schema: string) => Promise<number>;
  exists: (id: string, schema: string) => Promise<boolean>;
};
