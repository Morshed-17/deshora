import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { TUser } from "../User/user.interface";

export const createToken = (
  jwtPayload: any,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
