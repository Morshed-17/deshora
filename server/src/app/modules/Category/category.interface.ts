import { Types } from "mongoose";

export interface TCategory {
  image?: string;
  title: string;
  slug: string;
  description: string;
  children?: Types.ObjectId[];
  parent?: Types.ObjectId | null;
  isNested: boolean;
  productCount?: number
}
