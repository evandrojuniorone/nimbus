import { Column, Model, Table } from 'sequelize-typescript';

@Table({ schema: 'main', tableName: 'pages' })
export class Page extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'display_name' })
  displayName: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
