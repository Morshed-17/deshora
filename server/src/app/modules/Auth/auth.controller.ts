import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import AuthService from "./auth.service";
import config from "../../config";

const registerUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  }
);

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {

    

    const { accessToken, refreshToken } = await AuthService.loginUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User logged in successfully!",
      data: {
        accessToken,
      },
    });
  }
);

const AuthController = {
  registerUser,
  loginUser,
};

export default AuthController;
