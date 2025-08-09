import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import CategoryService from "./category.service";

const getAllCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, {
      statusCode: result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
      success: true,
      message:
        result.length > 0
          ? "Categories retrieved successfully!"
          : "No categories found",
      data: result,
    });
  }
);

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  }
);

const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const result = await CategoryService.updateCategory(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Category updated successfully!",
      data: result,
    });
  }
);

export const CategoryController = {
  createCategory,
  updateCategory,
  getAllCategories,
};
