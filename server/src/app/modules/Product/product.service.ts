import AppError from "../../errors/AppError";
import { uploadBufferToCloudinary } from "../../utils/cloudinary";
import { TProduct } from "./prodcut.interface";
import httpStatus from "http-status";
import Product from "./product.model";
import { getImageHash } from "../../utils/getImageHash";
import { ALLOWED_IMAGE_TYPES } from "../../constants";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllProducts = async (query: any) => {
  // Initialize QueryBuilder
  const queryBuilder = new QueryBuilder(Product.find(), query);

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

const createProduct = async (
  productData: TProduct,
  files: {
    featuredImage?: Express.Multer.File[];
    galleryImages?: Express.Multer.File[];
  }
) => {
  const { title, description, categoryId, price, stock } = productData;

  // Validate featured image

  // Validate featured image
  if (!files.featuredImage || files.featuredImage.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Featured image is required");
  }

  const file = files.featuredImage[0];
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Invalid file type for featured image: ${files.featuredImage[0].mimetype}`
    );
  }

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

  // upload featured image to cloudinary
  const featuredImageHash = getImageHash(file.buffer);
  const featuredImageUrl = await uploadBufferToCloudinary(
    files.featuredImage[0].buffer,
    "products",
    featuredImageHash
  );

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
    featuredImage: featuredImageUrl,
    galleryImages: galleryImageUrls,
  };

  const result = await Product.create(product);

  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
};
