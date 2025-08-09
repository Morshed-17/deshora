import express from "express";
import { productValidationShema } from "./product.validation";
import validateRequest from "../../middlewares/validateRequst";
import auth from "../../middlewares/auth";
import ProductController from "./product.controller";
import { upload } from "../../middlewares/multer";
const router = express.Router();

router.post(
  "/create",
  auth("admin"),
  upload,
  validateRequest(productValidationShema),
  ProductController.createProduct
);

export const ProductRoutes = router;
