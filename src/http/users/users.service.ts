import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { RolesRepository } from '@http/roles/repositories/roles.repository';

import { User } from '@http/users/models/user.model';
import { CreateUserDto } from '@http/users/dtos/create-user.dto';
import { UpdateUserDto } from '@http/users/dtos/update-user.dto';
import { UsersRepository } from '@http/users/repositories/users.repository';
import { UsersFilter } from '@http/users/repositories/users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly usersRepository: UsersRepository,
  ) { }

  async findOne(id: string, schema: string): Promise<User> {
    const userExists = await this.usersRepository.exists(id, schema);

    if (!userExists) {
      throw new BadRequestException('user does not exists');
    }

    return await this.usersRepository.findOne(id, schema);
  }

  async findMany(filter: UsersFilter, schema: string): Promise<User[]> {
    return await this.usersRepository.findMany(filter, schema);
  }

  async create(user: CreateUserDto, schema: string): Promise<User> {
    const usernameAlreadyExists = await this.usersRepository.findOneByUsername(user.username, schema) !== null;

    if (usernameAlreadyExists) {
      throw new BadRequestException('username already exists');
    }

    const emailAlreadyExists = await this.usersRepository.findOneByEmail(user.email, schema) !== null;

    if (emailAlreadyExists) {
      throw new BadRequestException('email already exists');
    }

    if (user.sellerCode) {
      const sellerCodeAlredyExists = await this.usersRepository.findOneBySellerCode(user.sellerCode, schema) !== null;

      if (sellerCodeAlredyExists) {
        throw new BadRequestException('sellerCode already exists');
      }
    }

    const roleExists = await this.rolesRepository.exists(user.roleId, schema);

    if (!roleExists) {
      throw new BadRequestException('role does not exists');
    }

    user.password = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.create(user, schema);
  }

  async update(id: string, user: UpdateUserDto, schema: string): Promise<boolean> {
    const userExists = await this.usersRepository.exists(id, schema);

    if (!userExists) {
      throw new BadRequestException('user does not exists');
    }

    const roleExists = await this.rolesRepository.exists(user.roleId, schema);

    if (!roleExists) {
      throw new BadRequestException('role does not exists');
    }

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    return await this.usersRepository.update(id, user, schema);
  }

  async delete(id: string, schema: string): Promise<boolean> {
    const user = await this.usersRepository.exists(id, schema);

    if (!user) {
      throw new BadRequestException(`user does not exists`);
    }

    return await this.usersRepository.delete(id, schema);
  }

  async deleteMany(ids: string[], schema: string): Promise<boolean> {
    return await this.usersRepository.deleteMany(ids, schema);
  }

  async count(filter: UsersFilter, schema: string): Promise<number> {
    return await this.usersRepository.count(filter, schema);
  }
}
