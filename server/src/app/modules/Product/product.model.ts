import { model, Schema } from "mongoose";
import { TProduct } from "./prodcut.interface";

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    featuredImage: {
      type: String,
    },
    galleryImages: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Product = model<TProduct>("Product", productSchema);

export default Product;
