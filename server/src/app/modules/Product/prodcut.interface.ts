import { Types } from "mongoose";

export interface TProduct {
  title: string;
  description: string;
  categoryId: string | Types.ObjectId;
  price: number;
  stock: number;
  featuredImage: string; // Cloudinary URL
  galleryImages: string[]; // Array of Cloudinary URLs
}
