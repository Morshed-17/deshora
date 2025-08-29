import { Types } from "mongoose";

export interface TOrderItem {
  product: Types.ObjectId | string;
  title: string;
  sku: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
  color: string;
  size?: string; // optional if product has sizes
}

export interface TGuestInfo {
  name: string;
  phone: string;
  email: string;
}

export type TOrder = {
  user: Types.ObjectId | string | null;
  guestInfo: TGuestInfo;
  items: TOrderItem[];
  deliveryAddress: string;
  paymentMethod: "COD" | "SSLCommerz";
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED";
  deliveryCharge: number;
  deliveryZone: "inside-dhaka" | "outside-dhaka";
};
