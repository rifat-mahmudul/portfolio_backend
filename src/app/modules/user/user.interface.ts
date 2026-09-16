import { Types } from "mongoose";

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
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: IsActive;
  isVerified: boolean;
}
