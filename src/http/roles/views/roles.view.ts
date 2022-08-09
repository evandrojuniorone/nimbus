import { Injectable } from '@nestjs/common';

import { Role } from '@http/roles/models/role.model';

@Injectable()
export class RolesView {
  complex(role: Role) {
    return {
      id: role.id,
      description: role.description,
      permissions: role.permissions.reduce((prev, curr) => {
        let module = prev.find(p => p.id === curr.module.id);

        if (!module) {
          module = {
            id: curr.module.id,
            name: curr.module.name,
            pages: [],
          };

          prev.push(module);
        }

        let page = module.pages.find(p => p.id === curr.page.id);

        if (!page) {
          page = {
            id: curr.page.id,
            name: curr.page.name,
          };

          module.pages.push(page);
        }

        return prev;
      }, []),
    }
  }

  complexMany(roles: Role[]) {
    return roles.map(role => this.complex(role));
  }
}
