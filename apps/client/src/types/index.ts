export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  first: string;
  last: string;
  roleId: string;
  photo: string;
}

export interface Role extends BaseEntity {
  name: string;
  isDefault: boolean;
  description: string;
}
