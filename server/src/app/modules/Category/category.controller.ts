import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import CategoryService from "./category.service";

const getAllCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Categories retrieved successfully!",
      data: result,
    });
  }
);

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const files = req.files as {
      file?: Express.Multer.File[];
    };

    const result = await CategoryService.createCategory(
      req.body,
      files.file as Express.Multer.File[]
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  }
);

const getSingleCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const result = await CategoryService.getSingleCategory(slug);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Category retrived successfully!",
      data: result,
    });
  }
);

const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const files = req.files as {
      file?: Express.Multer.File[];
    };

    const result = await CategoryService.updateCategory(
      id,
      req.body,
      files.file as Express.Multer.File[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Category updated successfully!",
      data: result,
    });
  }
);

const deleteCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await CategoryService.deleteCategory(id);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Category deleted successfully!",
      data: null,
    });
  }
);

export const CategoryController = {
  createCategory,
  updateCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
};
