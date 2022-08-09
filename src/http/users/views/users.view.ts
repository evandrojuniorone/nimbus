import { Injectable } from '@nestjs/common';

import { User } from '@http/users/models/user.model';

@Injectable()
export class UsersView {
  constructor(

  ) { }

  findOne(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      sellerCode: user.sellerCode,
      manager: user.manager,
      active: user.active,
      role: {
        id: user.role.id,
        description: user.role.description,
      },
    }
  }

  findMany(users: User[]) {
    return users.map(user => this.findOne(user));
  }

  create(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      sellerCode: user.sellerCode,
      manager: user.manager,
      active: user.active,
    }
  }
}
