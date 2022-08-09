import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Role } from '@http/roles/models/role.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'username' })
  username: string;

  @Column({ field: 'password' })
  password: string;

  @Column({ field: 'email' })
  email: string;

  @Column({ field: 'seller_code' })
  sellerCode: string;

  @Column({ field: 'manager' })
  manager: boolean;

  @Column({ field: 'active' })
  active: boolean;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column({ field: 'role_id' })
  roleId: string;
}
