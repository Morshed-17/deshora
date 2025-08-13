import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/user.interface";
import catchAsync from "../utils/asyncCatch";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../modules/User/user.model";

const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Chekcing if the token is available

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    // Checking if the given token is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { _id, role, iat } = decoded;

    // Check if the user is exists

    
    const user = await User.findById(_id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // Check is the user is active

    if (!user.isActive) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    }

    // Check roles based auth to protect routes

    if (requireRoles.length === 0) {
      return next();
    }

    if (requireRoles && !requireRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
