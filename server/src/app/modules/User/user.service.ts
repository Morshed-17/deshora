import AppError from "../../errors/AppError";
import User from "./user.model";
import Test from "./user.model";
import httpStatus from "http-status";

const getMe = async (userId: string) => {
  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No user found");
  }
  return result;
};

const UserService = {
  getMe,
};

export default UserService;
