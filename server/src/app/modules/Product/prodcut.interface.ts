import { Types } from "mongoose";

export interface TSize {
  size: string;
  stock: number;
}
export interface TProduct {
  title: string;
  description: string;
  color: string;
  categoryIds: string[] | Types.ObjectId[];
  price: number;
  stock?: number;
  sku: string;
  hasSizes: boolean;
  sizesAvailable: TSize[];
  galleryImages: string[]; // Array of Cloudinary URLs
}
