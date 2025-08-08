import e from "express";
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<Boolean>;
}

export type TUserRole = keyof typeof USER_ROLE