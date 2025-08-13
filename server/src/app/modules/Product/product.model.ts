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
      default: ''
    },
    color:{
      type: String,
      default: ''
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
    galleryImages: {
      type: [String],
      default: []
    },
    sku: {
       type: String,
       required: true
    }
  },
  { timestamps: true }
);

const Product = model<TProduct>("Product", productSchema);

export default Product;
