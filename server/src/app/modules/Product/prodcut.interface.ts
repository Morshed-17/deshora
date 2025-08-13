import { Types } from "mongoose";

export interface TProduct {
  title: string;
  description: string;
  color: string
  categoryId: string | Types.ObjectId;
  price: number;
  stock: number;
  sku: string
  galleryImages: string[]; // Array of Cloudinary URLs
}
