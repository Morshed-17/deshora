// category model
import { model, Schema } from "mongoose";
import { TOrder, TOrderItem } from "./order.interface";

const OrderItemSchema = new Schema<TOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true },
    color: { type: String, default: "" },
    sku: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
  },
  { _id: false } // prevents creating separate IDs for each item
);

const OrderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "SSLCommerz"],
      default: "COD",
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
const Order = model<TOrder>("Order", OrderSchema);

export default Order;
