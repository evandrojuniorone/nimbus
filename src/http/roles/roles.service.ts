import { Sequelize } from 'sequelize-typescript';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Role } from '@http/roles/models/role.model';
import { CreateRoleDto } from '@http/roles/dtos/create-role.dto';
import { UpdateRoleDto } from '@http/roles/dtos/update-role.dto';
import { CreatePermissionDto } from '@http/roles/dtos/create-permission';
import { RolesRepository } from '@http/roles/repositories/roles.repository';
import { RolesFilter } from '@http/roles/repositories/roles.repository.interface';
import { PermissionsRepository } from '@http/roles/repositories/permissions.repository';

@Injectable()
export class RolesService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly rolesRepository: RolesRepository,
    private readonly permissionsRepository: PermissionsRepository,
  ) { }

  async findOne(id: string, schema: string): Promise<Role> {
    const exists = await this.rolesRepository.exists(id, schema);

    if (!exists) {
      throw new BadRequestException('role does not exists');
    }

    return await this.rolesRepository.findOne(id, schema);
  }

  async findMany(filter: RolesFilter, schema: string): Promise<Role[]> {
    return await this.rolesRepository.findMany(filter, schema);
  }

  async create(role: CreateRoleDto, schema: string) {
    const roleDescriptionAlreadyExists = await this.rolesRepository.findOneByDescription(role.description, schema) !== null;

    if (roleDescriptionAlreadyExists) {
      throw new BadRequestException(`role description already exists`);
    }

    const transaction = await this.sequelize.transaction();

    try {
      const createdRole = await this.rolesRepository.create(role, schema, { transaction });

      if (!createdRole) {
        throw new BadRequestException('could not create role');
      }

      const permissions: CreatePermissionDto[] = role.modules.map(module => module.pages.map(page => ({
        roleId: createdRole.id,
        moduleId: module.id,
        pageId: page,
      }))).flat(1);

      const createdPermissions = await this.permissionsRepository.createBulk(permissions, schema, transaction);

      if (!createdPermissions.length) {
        throw new BadRequestException('could not create permissions');
      }

      await transaction.commit();

      return createdRole;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async update(id: string, role: UpdateRoleDto, schema: string): Promise<boolean> {
    const roleExists = await this.rolesRepository.findOne(id, schema);

    if (!roleExists) {
      throw new BadRequestException('role does not exists');
    }

    const transaction = await this.sequelize.transaction();

    try {
      const permissionsDeleted = await this.permissionsRepository.deleteByRole(id, schema, transaction);

      if (!permissionsDeleted) {
        throw new BadRequestException('could not delete permissions');
      }

      const roleUpdated = await this.rolesRepository.update(id, role, schema, transaction);

      if (!roleUpdated) {
        throw new BadRequestException('could not update role description');
      }

      const permissions: CreatePermissionDto[] = role.modules.map(module => module.pages.map(page => ({
        roleId: id,
        moduleId: module.id,
        pageId: page,
      }))).flat(1);

      const createdPermissions = await this.permissionsRepository.createBulk(permissions, schema, transaction);

      if (!createdPermissions.length) {
        throw new BadRequestException('could not create permissions');
      }

      await transaction.commit();

      return true;
    }
    catch(err) {
      await transaction.rollback();
      throw err;
    }
  }

  async delete(id: string, schema: string): Promise<boolean> {
    const transaction = await this.sequelize.transaction();

    try {
      const permissionsDeleted = await this.permissionsRepository.deleteByRole(id, schema, transaction);

      if (!permissionsDeleted) {
        throw new BadRequestException('could not delete permissions');
      }

      const roleDeleted = await this.rolesRepository.delete(id, schema, transaction);

      if (!roleDeleted) {
        throw new BadRequestException('could not delete role');
      }

      await transaction.commit();

      return true;
    }
    catch(err){
      await transaction.rollback();
      throw err;
    }
  }

  async count(filter: RolesFilter, schema: string): Promise<number> {
    return await this.rolesRepository.count(filter, schema);
  }
}
