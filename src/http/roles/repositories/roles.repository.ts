import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions, Op, Transaction, WhereOptions } from 'sequelize';

import { Page } from '@http/roles/models/page.model';
import { Role } from '@http/roles/models/role.model';
import { Module } from '@http/roles/models/module.model';
import { Permission } from '@http/roles/models/permission.model';
import { CreateRoleDto } from '@http/roles/dtos/create-role.dto';
import { UpdateRoleDto } from '@http/roles/dtos/update-role.dto';
import { IRolesRepository, RolesFilter } from '@http/roles/repositories/roles.repository.interface';

@Injectable()
export class RolesRepository implements IRolesRepository {
  constructor(
    @InjectModel(Role)
    private readonly roles: typeof Role,
  ) { }

  async findOne(id: string, schema: string): Promise<Role> {
    return await this.roles.schema(schema).findByPk(id, {
      include: [
        {
          model: Permission.schema(schema),
          required: true,
          include: [
            {
              model: Module,
              required: true,
            },
            {
              model: Page,
              required: true,
            }
          ]
        }
      ]
    });
  }

  async findOneByDescription(description: string, schema: string): Promise<Role> {
    return await this.roles.schema(schema).findOne({
      where: {
        description,
      },
    });
  }

  async findMany(filter: RolesFilter, schema: string): Promise<Role[]> {
    const where = this.generateWhere(filter);

    return await this.roles.schema(schema).findAll({
      where,
      limit: filter.size,
      offset: (filter.page - 1) * filter.size,
      order: ['description'],
    });
  }

  async create(role: CreateRoleDto, schema: string, options?: CreateOptions): Promise<Role> {
    return await this.roles.schema(schema).create({
      id: uuid(),
      description: role.description,
    }, options);
  }

  async update(id: string, role: UpdateRoleDto, schema: string, transaction?: Transaction): Promise<boolean> {
    const [affectedRows] = await this.roles.schema(schema).update({
      description: role.description,
    }, {
      where: {
        id,
      },
      transaction,
    });

    return affectedRows > 0;
  }

  async delete(id: string, schema: string, transaction?: Transaction): Promise<boolean> {
    const affectedRows = await this.roles.schema(schema).destroy({
      where: {
        id,
      },
      transaction,
    });

    return affectedRows > 0;
  }

  async count(filter: RolesFilter, schema: string): Promise<number> {
    const where = this.generateWhere(filter);

    return await this.roles.schema(schema).count({
      where,
    });
  }

  async exists(id: string, schema: string): Promise<boolean> {
    return await this.roles.schema(schema).count({
      where: {
        id,
      },
    }) > 0;
  }

  generateWhere(filter: RolesFilter): WhereOptions<Role> {
    const where: WhereOptions<Role> = {};

    if (filter.description) {
      where.description = {
        [Op.like]: `%${filter.description}%`,
      }
    }

    return where;
  }
}
