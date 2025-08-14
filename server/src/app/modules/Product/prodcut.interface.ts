import { Types } from "mongoose";

export interface TSize {
  size: string;
  stock: number;
}
export interface TProduct {
  title: string;
  description: string;
  color: string;
  categoryId: string | Types.ObjectId;
  price: number;
  stock?: number;
  sku: string;
  sizesAvailable: TSize[];
  galleryImages: string[]; // Array of Cloudinary URLs
}

