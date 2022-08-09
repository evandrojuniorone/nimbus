import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { State } from '@http/shared/models/state.model';

@Table({ schema: 'main', tableName: 'cities' })
export class City extends Model {
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

  @BelongsTo(() => State)
  state: State;

  @ForeignKey(() => State)
  @Column({ field: 'state_id' })
  stateId: string;
}
