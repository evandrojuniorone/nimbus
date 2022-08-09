import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module as NestModule } from '@nestjs/common';

import { HttpModule } from '@http/http.module';

import { Page } from '@http/roles/models/page.model';
import { Role } from '@http/roles/models/role.model';
import { Module } from '@http/roles/models/module.model';
import { Permission } from '@http/roles/models/permission.model';

import { User } from '@http/users/models/user.model';

@NestModule({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        User,
        Role,
        Permission,
        Module,
        Page,
      ],
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
