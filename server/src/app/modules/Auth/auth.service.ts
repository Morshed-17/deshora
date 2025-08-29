import AppError from "../../errors/AppError";

import httpStatus from "http-status";
import User from "../User/user.model";
import { createToken } from "./auth.utils";
import config from "../../config";

const registerUser = async (user: {
  name: string;
  password: string;
  email: string;
}) => {
  const userExists = await User.findOne({ email: user.email });
  if (userExists) {
    throw new AppError(httpStatus.CONFLICT, "This email is already registered");
  }

  const result = await User.create(user);

  return result;
};

const loginUser = async (credentials: { password: string; email: string }) => {
  const user = await User.findOne({ email: credentials.email }).select(
    "+password"
  );

  // checks if the user is exists
  if (!user) {
    throw new AppError(
      httpStatus.CONFLICT,
      "No user found by this email address"
    );
  }

  if (!user.isActive) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is suspended. Please contact support."
    );
  }

  if (!(await User.isPasswordMatched(credentials.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const payload = {
    _id: user._id, // ObjectId
    name: user.name, // string
    email: user.email, // string
    role: user.role, // string ('admin')
    phone: user.phone,
    isActive: user.isActive, // boolean
    createdAt: user.createdAt, // Date
    updatedAt: user.updatedAt, // Date
  };

  const accessToken = createToken(
    payload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    payload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const AuthService = {
  registerUser,
  loginUser,
};

export default AuthService;
