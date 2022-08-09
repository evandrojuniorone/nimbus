import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';

import { Module } from '@http/roles/models/module.model';
import { Permission } from '@http/roles/models/permission.model';

@Table({ tableName: 'roles' })
export class Role extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'description' })
  description: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @HasMany(() => Permission)
  permissions: Permission[];
}
