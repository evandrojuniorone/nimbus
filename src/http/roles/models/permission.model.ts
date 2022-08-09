import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Role } from '@http/roles/models/role.model';
import { Page } from '@http/roles/models/page.model';
import { Module } from '@http/roles/models/module.model';

@Table({ tableName: 'permissions', createdAt: false, updatedAt: false, })
export class Permission extends Model {
  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column({ field: 'role_id', primaryKey: true })
  roleId: string;
  
  @BelongsTo(() => Module)
  module: Module;

  @ForeignKey(() => Module)
  @Column({ field: 'module_id', primaryKey: true })
  moduleId: string;

  @BelongsTo(() => Page)
  page: Page;

  @ForeignKey(() => Page)
  @Column({ field: 'page_id', primaryKey: true })
  pageId: string;
}
