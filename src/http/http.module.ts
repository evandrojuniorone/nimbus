import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module as NestModule } from '@nestjs/common';

import { Role } from '@http/roles/models/role.model';
import { Page } from '@http/roles/models/page.model';
import { Module } from '@http/roles/models/module.model';
import { RolesView } from '@http/roles/views/roles.view';
import { RolesService } from '@http/roles/roles.service';
import { RolesController } from '@http/roles/roles.controller';
import { Permission } from '@http/roles/models/permission.model';
import { RolesRepository } from '@http/roles/repositories/roles.repository';
import { PermissionsRepository } from '@http/roles/repositories/permissions.repository';

import { User } from '@http/users/models/user.model';
import { UsersView } from '@http/users/views/users.view';
import { UsersService } from '@http/users/users.service';
import { UsersController } from '@http/users/users.controller';
import { UsersRepository } from '@http/users/repositories/users.repository';

@NestModule({
  imports: [
    SequelizeModule.forFeature([
      Role,
      User,
      Permission,
      Module,
      Page,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [
    RolesController,
    UsersController,
  ],
  providers: [
    //Roles
    RolesService,
    RolesRepository,
    PermissionsRepository,
    RolesView,

    //Users
    UsersService,
    UsersRepository,
    UsersView,
  ],
})
export class HttpModule { }
