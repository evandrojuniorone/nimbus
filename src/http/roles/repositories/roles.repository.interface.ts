import { CreateOptions, Transaction } from 'sequelize';

import { Role } from '@http/roles/models/role.model';
import { CreateRoleDto } from '@http/roles/dtos/create-role.dto';
import { UpdateRoleDto } from '@http/roles/dtos/update-role.dto';

export type RolesFilter = {
  description?: string;
  page?: number;
  size?: number;
};

export interface IRolesRepository {
  findOne: (id: string, schema: string) => Promise<Role>;
  findOneByDescription: (description: string, schema: string) => Promise<Role>;
  findMany: (filter: RolesFilter, schema: string) => Promise<Role[]>;
  create: (role: CreateRoleDto, schema: string, options?: CreateOptions) => Promise<Role | null>;
  update: (id: string, role: UpdateRoleDto, schema: string, transaction?: Transaction) => Promise<boolean>;
  delete: (id: string, schema: string, transaction?: Transaction) => Promise<boolean>;
  count: (filter: RolesFilter, schema: string) => Promise<number>;
};
