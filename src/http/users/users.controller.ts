import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { UsersView } from '@http/users/views/users.view';
import { UsersService } from '@http/users/users.service';
import { CreateUserDto } from '@http/users/dtos/create-user.dto';
import { UpdateUserDto } from '@http/users/dtos/update-user.dto';
import { UsersFilter } from '@http/users/repositories/users.repository.interface';

import { AuthGuard } from '@http/shared/guards/auth.guard';
import { Schema } from '@http/shared/decorators/schema.decorator';

type UsersFilterQuery = {
  name?: string;
  username?: string;
  active?: string;
  roleId?: string;
  page?: string;
  size?: string;
};

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersView: UsersView,
    private readonly usersService: UsersService,
  ) { }

  @Get(':id')
  async findOne(@Param('id') id: string, @Schema() schema: string) {
    return this.usersView.findOne(await this.usersService.findOne(id, schema));
  }

  @Get()
  async findMany(@Query() query: UsersFilterQuery, @Schema() schema: string) {
    const filter: UsersFilter = {};

    query.name && (filter.name = query.name);
    query.username && (filter.username = query.username);
    query.active && (filter.active = query.active === 'true');
    query.roleId && (filter.roleId = query.roleId);

    const count = await this.usersService.count(filter, schema);

    filter.page = Number(query.page ?? 1);
    filter.size = Number(query.size ?? count);

    return {
      users: this.usersView.findMany(await this.usersService.findMany(filter, schema)),
      count,
    }
  }

  @Post()
  async create(@Body() user: CreateUserDto, @Schema() schema: string) {
    return this.usersView.create(await this.usersService.create(user, schema));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto, @Schema() schema: string) {
    await this.usersService.update(id, user, schema);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Schema() schema: string) {
    await this.usersService.delete(id, schema);
  }

  @Delete()
  async deleteMany(@Body() ids: string[], @Schema() schema: string) {
    await this.usersService.deleteMany(ids, schema);
  }
}
