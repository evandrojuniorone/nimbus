import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { City } from '@http/shared/models/city.model';

@Table({ schema: 'main', tableName: 'neighborhoods' })
export class Neighborhood extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => City)
  @Column({ field: 'city_id' })
  cityId: string;
}
