import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequst";
import {
  createCategoryValidationSchema,
  updateUategoryValidationSchema,
} from "./category.validation";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/multer";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:slug", CategoryController.getSingleCategory);

router.post(
  "/create",
  auth("admin"),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory
);

router.put(
  "/:id",
  auth("admin"),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(updateUategoryValidationSchema),
  CategoryController.updateCategory
);

router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
