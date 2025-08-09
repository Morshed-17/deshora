import AppError from "../../errors/AppError";

import httpStatus from "http-status";
import Category from "./category.model";
import { TCategory } from "./category.interface";

const getAllCategories = async () => {
  const result = await Category.find({isDeleted: false});
  return result;
};

const createCategory = async (category: TCategory) => {
  const result = await Category.create(category);
  return result;
};

const updateCategory = async (id: string, updated: Partial<TCategory>) => {
  const result = await Category.findOneAndUpdate({_id: id}, updated, { new: true });
  if (!result) {
    throw new AppError(400, "Failed to update category");
  }
  return result;
};

const CategoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
};

export default CategoryService;
