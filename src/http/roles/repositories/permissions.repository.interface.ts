import { CreateOptions, Transaction } from 'sequelize';

import { Permission } from '@http/roles/models/permission.model';
import { CreatePermissionDto } from '@http/roles/dtos/create-permission';

export interface IPermissionsRepository {
  create: (permission: CreatePermissionDto, schema: string, transaction?: Transaction) => Promise<Permission>;
  createBulk: (permissions: CreatePermissionDto[], schema: string, transaction?: Transaction) => Promise<Permission[]>
  deleteByRole: (roleId: string, schema: string, transaction?: Transaction) => Promise<boolean>;
};
