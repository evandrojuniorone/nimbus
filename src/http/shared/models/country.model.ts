import { Column, Model, Table } from 'sequelize-typescript';

@Table({ schema: 'main', tableName: 'countries' })
export class Country extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'initials' })
  initials: string;

  @Column({ field: 'code' })
  code: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
