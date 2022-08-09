import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Country } from '@http/shared/models/country.model';

@Table({ schema: 'main', tableName: 'states' })
export class State extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'initials' })
  initials: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => Country)
  country: Country;

  @ForeignKey(() => Country)
  @Column({ field: 'country_id' })
  countryId: string;
}
