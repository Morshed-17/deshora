import ProductService from "./product.service";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/asyncCatch";
import sendResponse from "../../utils/sendResponse";

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const files = req.files as {
      featuredImage?: Express.Multer.File[];
      galleryImages?: Express.Multer.File[];
    };
    const result = await ProductService.createProduct(req.body, files);
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
};

export default ProductController;
