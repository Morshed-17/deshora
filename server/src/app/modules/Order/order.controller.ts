import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import OrderService from "./order.service";

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.createOrder(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
};
