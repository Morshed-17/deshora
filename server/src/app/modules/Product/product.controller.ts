import { ProductService } from "./product.service";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/asyncCatch";
import sendResponse from "../../utils/sendResponse";

const getAllProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result = await ProductService.getAllProducts(query);
    sendResponse(res, {
      statusCode:
        result.products.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
      success: true,
      message:
        result.products.length > 0
          ? "Products retrieved successfully!"
          : "No categories found",
      data: result,
    });
  }
);

const getSingleProductBySku: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { sku } = req.params;
    const result = await ProductService.getSingleProductBySku({ sku });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
  }
);

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const files = req.files as {
      file?: Express.Multer.File[];
    };

    const result = await ProductService.createProduct(
      req.body,
      files.file as Express.Multer.File[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  }
);

const ProductController = {
  createProduct,
  getSingleProductBySku,
  getAllProducts,
};

export default ProductController;
