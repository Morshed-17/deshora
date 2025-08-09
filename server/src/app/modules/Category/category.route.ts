import { Router } from "express";
import validateRequest from "../../middlewares/validateRequst";
import {
  createCategoryValidationSchema,
  updateUategoryValidationSchema,
} from "./category.validation";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/", CategoryController.getAllCategories);

router.post(
  "/create",
  auth("admin"),
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory
);

router.put(
  "/update/:id",
  auth("admin"),
  validateRequest(updateUategoryValidationSchema),
  CategoryController.updateCategory
);

export const CategoryRoutes = router;
