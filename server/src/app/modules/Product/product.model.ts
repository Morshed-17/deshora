import { model, Schema } from "mongoose";
import { TProduct, TSize } from "./prodcut.interface";

const sizesAvailableSchema = new Schema<TSize>({
  size: { type: String, required: true },
  stock: { type: Number, default: 0 },
});

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    categoryIds: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    galleryImages: {
      type: [String],
      default: [],
      required: true,
    },
    hasSizes: {
      type: Boolean,
      default: false,
    },
    sizesAvailable: [sizesAvailableSchema],
    sku: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to update top-level stock
productSchema.pre("save", function (next) {
  if (this.sizesAvailable && this.sizesAvailable.length > 0) {
    // Sum all stocks in sizesAvailable
    this.stock = this.sizesAvailable.reduce(
      (total, size) => total + (size.stock || 0),
      0
    );
  }
  next();
});

const Product = model<TProduct>("Product", productSchema);

export default Product;
