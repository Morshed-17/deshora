// types/user.ts
export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  children: any[]; // Change `any[]` to a stricter type if you know the shape of children
  createdAt: string; // ISO date string
  description: string;
  id: string;
  isDeleted: boolean;
  isNested: boolean;
  parent: string | null;
  slug: string;
  title: string;
  updatedAt: string; // ISO date string
  __v: number;
  _id: string;
}
export interface TSize {
  size: string;
  stock: number;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  categoryIds: string[];
  color: string;
  price: number;
  stock: number;
  galleryImages: string[];
  sizesAvailable: TSize[];
  sku: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
