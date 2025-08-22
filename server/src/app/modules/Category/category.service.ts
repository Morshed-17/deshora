import AppError from "../../errors/AppError";

import httpStatus from "http-status";
import Category from "./category.model";
import { TCategory } from "./category.interface";
import slugify from "slugify";
import { ALLOWED_IMAGE_TYPES } from "../../constants";
import { getImageHash } from "../../utils/getImageHash";
import { uploadBufferToCloudinary } from "../../utils/cloudinary";

const getAllCategories = async (parentId?: string) => {
  const query = parentId ? { parent: parentId } : { parent: null };

  const result = await Category.find(query).populate([
    {
      path: "children",
      select: "title slug children ",
      populate: {
        path: "children",
        select: "title slug",
      },
    },
    {
      path: "productCount",
    },
  ]);
  return result;
};

const createCategory = async (
  payload: Partial<TCategory>,
  files: Express.Multer.File[]
) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Invalid file type for featured image: ${file.mimetype}`
        );
      }
    });
  }

  let imageUrl = "";

  if (files && files.length > 0) {
    const hash = getImageHash(files[0].buffer);
    imageUrl = await uploadBufferToCloudinary(
      files[0].buffer,
      "categories",
      hash
    );
  }

  if (payload.parent) {
    const parentCategory = Category.findById(payload.parent);
    if (!parentCategory) {
      throw new AppError(httpStatus.NOT_FOUND, "Parent category not found");
    }
    payload.isNested = true;
  }

  const category = {
    slug: slugify(payload.title as string, { lower: true, strict: true }),
    image: imageUrl,
    ...payload,
  };

  const result = await Category.create(category);
  return result;
};

const getSingleCategory = async (slug: string) => {
  const result = await Category.findOne({ slug });

  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<TCategory>,
  files: Express.Multer.File[]
) => {
  const existing = await Category.findById(id);

  if (files && files.length > 0) {
    files.forEach((file) => {
      if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Invalid file type for featured image: ${file.mimetype}`
        );
      }
    });
  }

  const { title, description } = payload;
  let imageUrl = "";

  if (files && files.length > 0) {
    const hash = getImageHash(files[0].buffer);
    imageUrl = await uploadBufferToCloudinary(
      files[0].buffer,
      "categories",
      hash
    );
  }

  const updates: Partial<TCategory> = {};

  if (existing?.title !== payload.title) updates.title = title;
  if (description) updates.description = description;
  if (imageUrl) updates.image = imageUrl;

  const result = await Category.findByIdAndUpdate(
    id,
    {
      ...updates,
      slug: slugify(payload.title as string, { lower: true, strict: true }),
    },
    { new: true }
  );
  return result;
};

const deleteCategory = async (id: string) => {
  const category = await Category.findById(id).populate("productCount");
  if (category?.productCount !== 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can’t delete this category yet — some products are still linked to it. Please remove those products first."
    );
  }

  const result = await Category.findByIdAndDelete(id);

  return result;
};

const CategoryService = {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
