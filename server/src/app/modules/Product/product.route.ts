import express, { NextFunction, Request, Response } from "express";
import { productValidationShema } from "./product.validation";
import validateRequest from "../../middlewares/validateRequst";
import auth from "../../middlewares/auth";
import ProductController from "./product.controller";
import { upload } from "../../middlewares/multer";
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:sku", ProductController.getSingleProductBySku);

// admin
router.delete("/:id", auth("admin"), ProductController.deleteAProduct);
// admin
router.post(
  "/create",
  auth("admin"),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidationShema),
  ProductController.createProduct
);
router.put(
  "/edit/:sku",
  auth("admin"),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProductController.editProduct
);

export const ProductRoutes = router;
