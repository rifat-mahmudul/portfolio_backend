export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: IsActive;
  isVerified: boolean;
}
