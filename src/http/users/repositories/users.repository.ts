import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from '@http/roles/models/role.model';

import { User } from '@http/users/models/user.model';
import { CreateUserDto } from '@http/users/dtos/create-user.dto';
import { UpdateUserDto } from '@http/users/dtos/update-user.dto';
import { IUsersRepository, UsersFilter } from '@http/users/repositories/users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User)
    private readonly users: typeof User,
  ) { }

  async findOne(id: string, schema: string): Promise<User> {
    return await this.users.schema(schema).findByPk(id, {
      include: {
        model: Role.schema(schema),
        required: true,
      },
    });
  }

  async findOneByUsername(username: string, schema: string): Promise<User> {
    return await this.users.schema(schema).findOne({
      where: {
        username,
      },
    });
  }

  async findOneByEmail(email: string, schema: string): Promise<User> {
    return await this.users.schema(schema).findOne({
      where: {
        email,
      },
    });
  }

  async findOneBySellerCode(sellerCode: string, schema: string): Promise<User> {
    return await this.users.schema(schema).findOne({
      where: {
        sellerCode,
      },
    });
  }

  async findMany(filter: UsersFilter, schema: string): Promise<User[]> {
    const where = this.generateWhere(filter);

    return await this.users.schema(schema).findAll({
      where,
      limit: filter.size,
      offset: (filter.page - 1) * filter.size,
      order: ['name'],
      include: {
        model: Role.schema(schema),
        required: true,
      },
    });
  }

  async create(user: CreateUserDto, schema: string): Promise<User> {
    return await this.users.schema(schema).create({
      id: uuid(),
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
      manager: user.manager,
      active: user.active,
      sellerCode: user.sellerCode,
      roleId: user.roleId,
    });
  }

  async update(id: string, user: UpdateUserDto, schema: string): Promise<boolean> {
    const [affectedRows] = await this.users.schema(schema).update(user, {
      where: {
        id,
      },
    });

    return affectedRows > 0;
  }

  async delete(id: string, schema: string): Promise<boolean> {
    const affectedRows = await this.users.schema(schema).destroy({
      where: {
        id,
      }
    });

    return affectedRows > 0;
  }

  async deleteMany(ids: string[], schema: string): Promise<boolean> {
    const affectedRows = await this.users.schema(schema).destroy({
      where: {
        id: ids,
      }
    });

    return affectedRows > 0;
  }

  async count(filter: UsersFilter, schema: string): Promise<number> {
    const where = this.generateWhere(filter);

    return await this.users.schema(schema).count({
      where,
    });
  }

  async exists(id: string, schema: string): Promise<boolean> {
    return await this.users.schema(schema).count({
      where: {
        id,
      },
    }) > 0;
  }

  generateWhere(filter: UsersFilter): WhereOptions<User> {
    const where: WhereOptions<User> = {};

    if (filter.name) {
      where.name = {
        [Op.like]: `%${filter.name}%`,
      }
    }

    if (filter.username) {
      where.username = {
        [Op.like]: `%${filter.username}%`,
      }
    }

    if (filter.active !== undefined) {
      where.active = filter.active;
    }

    if (filter.roleId) {
      where.roleId = filter.roleId;
    }

    return where;
  }
}
