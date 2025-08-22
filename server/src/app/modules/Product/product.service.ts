import AppError from "../../errors/AppError";
import { uploadBufferToCloudinary } from "../../utils/cloudinary";
import { TProduct } from "./prodcut.interface";
import httpStatus from "http-status";
import Product from "./product.model";
import { getImageHash } from "../../utils/getImageHash";
import { ALLOWED_IMAGE_TYPES } from "../../constants";
import { generateSKU } from "./product.utils";

const getAllProducts = async (query: Record<string, unknown>) => {
  // Search
  let searchTerm = "";
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchableFields = ["title", "description"];

  const searchedProducts = Product.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // Paginating

  // 1st skip 0
  // 2nd skip 2*10 - 1*10
  // 3rd skip 3*10 - 2*10

  // skip = (page-1)*limit
  let limit = Number(query?.limit || 10);
  let skip = 0;

  if (query.page) {
    const page = Number(query?.page || 1);
    skip = Number((page - 1) * limit);
  }

  const skippedQuery = searchedProducts.skip(skip);

  const limitQuery = skippedQuery.limit(limit);

  // Copied from payload object

  const queryObj = { ...query };

  // sorting

  let sortBy = "price -createdAt";

  if (query?.sortBy) {
    sortBy = query?.sortBy as string;
  }

  const sortQuery = limitQuery.sort(sortBy);

  // Field filtering

  let fields = "";

  if (queryObj?.fields) {
    fields = (query?.fields as string).split(",").join(" ") || "";
  }

  const fieldQuery = sortQuery.select(fields);

  let min = 0;
  let max = 9999999999;

  if (queryObj?.min) {
    min = Number(queryObj?.min);
  }
  if (queryObj?.max) {
    max = Number(queryObj?.max);
  }

  const minMaxQuery = fieldQuery
    .find({ price: { $gte: min } })
    .find({ price: { $lt: max } });

  const excludeFields = [
    "searchTerm",
    "page",
    "limit",
    "sortBy",
    "fields",
    "min",
    "max",
  ];

  excludeFields.forEach((e) => delete queryObj[e]);

  if (queryObj.categoryIds) {
    const categories = (queryObj.categoryIds as string).split(",");
    queryObj.categoryIds = { $in: categories };
  }

  const [result, total] = await Promise.all([
    minMaxQuery.find(queryObj),
    Product.countDocuments({
      ...minMaxQuery.getFilter(), // includes your price + search filters
      ...queryObj, // includes categoryIds and others
    }),
  ]);

  const page = Number(query?.page) || 1;
  const totalPage = Math.ceil(total / limit);

  return {
    products: result,

    meta: {
      page: page,
      limit,
      total,
      totalPage,
    },
  };
};

const getSingleProductBySku = async ({ sku }: { sku: string }) => {
  const result = await Product.findOne({ sku });
  return result;
};

const createProduct = async (
  productData: TProduct,
  files: Express.Multer.File[]
) => {
  const {
    title,
    description,
    categoryIds,
    price,
    color,
    sizesAvailable,
    hasSizes,
    stock,
  } = productData;

  // Validate featured image

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

  // upload gallery image to cloudinary

  const galleryImageUrls =
    files && files.length > 0
      ? await Promise.all(
          files.map(async (file) => {
            console.log(file, "from map");
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
    categoryIds,
    price,
    color,
    sizesAvailable,
    hasSizes,
    stock,
    galleryImages: galleryImageUrls,
    sku: generateSKU(title),
  };

  const result = await Product.create(product);

  return result;
};

const editProduct = async (
  sku: string,
  productData: Partial<TProduct>,
  files: Express.Multer.File[]
) => {
  const {
    title,
    description,
    categoryIds,
    price,
    color,
    sizesAvailable,
    hasSizes,
    stock,
  } = productData;

  // Separate existingImages from the main object
  const existingImages: string[] = productData.galleryImages || [];

  // Validate featured image

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

  // upload gallery image to cloudinary

  const newGalleryUrls =
    files && files.length > 0
      ? await Promise.all(
          files.map(async (file) => {
            console.log(file, "from map");
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

  // Merge existing + new URLs
  const finalGalleryImages = [...existingImages, ...newGalleryUrls];

  let updates: Partial<TProduct> = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (categoryIds) updates.categoryIds = categoryIds;
  if (price !== undefined) updates.price = price;
  if (color) updates.color = color;
  if (sizesAvailable) updates.sizesAvailable = sizesAvailable;
  if (hasSizes !== undefined) updates.hasSizes = hasSizes;
  if (stock !== undefined) updates.stock = stock;

  updates.galleryImages = finalGalleryImages;

  if (updates.sizesAvailable && updates.sizesAvailable.length > 0) {
    updates.stock = updates.sizesAvailable.reduce(
      (total, size) => total + size.stock,
      0
    );
  }

  const result = await Product.findOneAndUpdate({ sku }, updates, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteAProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getSingleProductBySku,
  getAllProducts,
  deleteAProduct,
  editProduct,
};
