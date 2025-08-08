import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import TestService from "./user.service";

const getMe: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestService.getMe(req.user.userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is retrived successfully!",
      data: result,
    });
  }
);

const UserController = {
  getMe,
};

export default UserController;
