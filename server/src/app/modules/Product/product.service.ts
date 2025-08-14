import AppError from "../../errors/AppError";
import { uploadBufferToCloudinary } from "../../utils/cloudinary";
import { TProduct } from "./prodcut.interface";
import httpStatus from "http-status";
import Product from "./product.model";
import { getImageHash } from "../../utils/getImageHash";
import { ALLOWED_IMAGE_TYPES } from "../../constants";
import QueryBuilder from "../../builder/QueryBuilder";
import { generateSKU } from "./product.utils";

const getAllProducts = async (query: any) => {
  // Initialize QueryBuilder
  const queryBuilder = new QueryBuilder(Product.find().populate("categoryId", "title"), query);

  // Build Query
  const products = await queryBuilder
    .search(["name", "description"]) // Searchable fields
    .filter() // Filterable fields
    .sort() // Sorting
    .paginate() // Pagination
    .fields().modelQuery; // Select specific fields

  // Count Metadata
  const meta = await queryBuilder.countTotal();

  return {
    products,
    meta,
  };
};

const getSingleProductBySku = async ({ sku }: { sku: string }) => {
  const result = await Product.findOne({ sku });
  return result
};

const createProduct = async (
  productData: TProduct,
  files: {
    galleryImages?: Express.Multer.File[];
  }
) => {
  const { title, description, categoryId, price, stock, color } = productData;

  // Validate featured image

  if (files.galleryImages && files.galleryImages.length > 0) {
    files.galleryImages.forEach((file) => {
      if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Invalid file type for featured image: ${file.mimetype}`
        );
      }
    });
  }

  // upload gallery image to cloudinary

  const galleryImageUrls =
    files.galleryImages && files.galleryImages.length > 0
      ? await Promise.all(
          files.galleryImages.map(async (file) => {
            const hash = getImageHash(file.buffer);
            const url = await uploadBufferToCloudinary(
              file.buffer,
              "products",
              hash // use hash as public_id
            );
            return url;
          })
        )
      : [];

  const product: TProduct = {
    title,
    description,
    categoryId,
    price,
    stock,
    color,
    galleryImages: galleryImageUrls,
    sku: generateSKU(title),
  };

  const result = await Product.create(product);

  return result;
};

export const ProductService = {
  createProduct,
  getSingleProductBySku,
  getAllProducts,
};
