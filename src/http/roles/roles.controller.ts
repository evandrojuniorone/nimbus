import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { RolesView } from '@http/roles/views/roles.view';
import { RolesService } from '@http/roles/roles.service';
import { CreateRoleDto } from '@http/roles/dtos/create-role.dto';
import { UpdateRoleDto } from '@http/roles/dtos/update-role.dto';
import { RolesFilter } from '@http/roles/repositories/roles.repository.interface';

import { AuthGuard } from '@http/shared/guards/auth.guard';
import { Schema } from '@http/shared/decorators/schema.decorator';

type RolesFilterQuery = {
  description?: string;
  page?: string;
  size?: string;
};

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(
    private readonly rolesView: RolesView,
    private readonly rolesService: RolesService,
  ) { }

  @Get(':id')
  async findOne(@Param('id') id: string, @Schema() schema: string) {
    return this.rolesView.complex(await this.rolesService.findOne(id, schema));
  }

  @Get()
  async findMany(@Query() query: RolesFilterQuery, @Schema() schema: string) {
    const filter: RolesFilter = {};

    query.description && (filter.description = query.description);

    const count = await this.rolesService.count(filter, schema);

    filter.page = Number(query.page ?? 1);
    filter.size = Number(query.size ?? count);

    return {
      roles: await this.rolesService.findMany(filter, schema),
      count,
    }
  }
  
  @Post()
  async create(@Body() role: CreateRoleDto, @Schema() schema: string) {
    return await this.rolesService.create(role, schema);
  }
    
  @Put(':id')
  async update(@Param('id') id: string, @Body() role: UpdateRoleDto, @Schema() schema: string) {
    await this.rolesService.update(id, role, schema);
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string, @Schema() schema: string) {
    await this.rolesService.delete(id, schema);
  }
}