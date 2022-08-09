import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions, Transaction } from 'sequelize';

import { Permission } from '@http/roles/models/permission.model';
import { CreatePermissionDto } from '@http/roles/dtos/create-permission';
import { IPermissionsRepository } from '@http/roles/repositories/permissions.repository.interface';

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
  constructor(
    @InjectModel(Permission)
    private readonly permissions: typeof Permission,
  ) { }

  async create(permission: CreatePermissionDto, schema: string, transaction?: Transaction): Promise<Permission> {
    return await this.permissions.schema(schema).create({
      roleId: permission.roleId,
      moduleId: permission.moduleId,
      pageId: permission.pageId,
    }, {
      transaction,
    });
  }

  async createBulk(permissions: CreatePermissionDto[], schema: string, transaction?: Transaction): Promise<Permission[]> {
    return await this.permissions.schema(schema).bulkCreate(permissions.map(permission => ({
      roleId: permission.roleId,
      moduleId: permission.moduleId,
      pageId: permission.pageId,
    })), {
      transaction,
    });
  }

  async deleteByRole(roleId: string, schema: string, transaction?: Transaction): Promise<boolean> {
    const affectedRows = await this.permissions.schema(schema).destroy({
      where: {
        roleId,
      },
      transaction,
    });

    return affectedRows > 0;
  }
}
