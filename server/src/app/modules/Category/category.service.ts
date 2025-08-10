import AppError from "../../errors/AppError";

import httpStatus from "http-status";
import Category from "./category.model";
import { TCategory } from "./category.interface";
import slugify from "slugify";

const getAllCategories = async (parentId?: string) => {
  const query = parentId ? { parent: parentId } : { parent: null };

  const result = await Category.find(query).populate({
    path: "children",
    select: "title slug children ",
    populate: {
      path: "children",
      select: "title slug",
    },
  });
  return result;
};

const createCategory = async (payload: Partial<TCategory>) => {
  if (payload.parent) {
    const parentCategory = Category.findById(payload.parent);
    if (!parentCategory) {
      throw new AppError(httpStatus.NOT_FOUND, "Parent category not found");
    }
    payload.isNested = true;
  }

  const category = {
    slug: slugify(payload.title as string, { lower: true, strict: true }),
    ...payload,
  };

  const result = await Category.create(category);
  return result;
};

const updateCategory = async (id: string, updated: Partial<TCategory>) => {
  const result = await Category.findOneAndUpdate({ _id: id }, updated, {
    new: true,
  });
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
