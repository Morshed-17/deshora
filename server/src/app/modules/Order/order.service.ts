import AppError from "../../errors/AppError";

import httpStatus from "http-status";
import { TGuestInfo, TOrder } from "./order.interface";
import Order from "./order.model";
import Product from "../Product/product.model";
import mongoose from "mongoose";
import User from "../User/user.model";
import { calculateDeliveryCharge } from "./order.utils";

const createOrder = async (payload: Partial<TOrder>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = payload.user;

    const orderItems = await Promise.all(
      payload.items!.map(async (item) => {
        const product = await Product.findById(item.product).session(session);
        if (!product) {
          throw new AppError(httpStatus.NOT_FOUND, `Product not found`);
        }

        if (product.hasSizes) {
          if (!item.size)
            throw new AppError(httpStatus.BAD_REQUEST, `Size is required`);

          const sizeData = product.sizesAvailable.find(
            (s) => s.size === item.size
          );
          if (!sizeData)
            throw new AppError(
              httpStatus.NOT_FOUND,
              `Size ${item.size} not available`
            );
          if (product.stock! < item.quantity || sizeData.stock < item.quantity)
            throw new AppError(
              httpStatus.BAD_REQUEST,
              `Insufficient stock for ${item.size}`
            );

          await Product.updateOne(
            { _id: item.product, "sizesAvailable.size": item.size },
            {
              $inc: {
                "sizesAvailable.$.stock": -item.quantity,
                stock: -item.quantity,
              },
            }
          ).session(session);
        } else {
          if (product.stock! < item.quantity)
            throw new AppError(httpStatus.BAD_REQUEST, `Insufficient stock`);
          await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: -item.quantity } }
          ).session(session);
        }

        return {
          product: product._id,
          title: product.title,
          color: product.color,
          sku: product.sku,
          image: product.galleryImages?.[0] || "",
          price: product.price,
          discount: 0,
          quantity: item.quantity,
          size: item.size || null,
        };
      })
    );

    // Delivery charge =

    const deliveryCharge = calculateDeliveryCharge(
      payload.deliveryZone || "inside-dhaka"
    );

    // Create Order Here
    const totalAmount =
      orderItems.reduce((sum, item) => {
        const finalPrice = item.price - (item.discount || 0);
        return sum + finalPrice * item.quantity;
      }, 0) + deliveryCharge;

    const orderData: TOrder = {
      items: orderItems,
      user: user ? user : null,
      guestInfo: payload.guestInfo!,
      deliveryAddress: payload.deliveryAddress!,
      totalAmount,
      paymentMethod: payload.paymentMethod || "COD",
      status: "PENDING",
      deliveryZone: payload.deliveryZone || "inside-dhaka",
      deliveryCharge,
    };

    const result = await Order.create(orderData);

    await session.commitTransaction();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};
const getCustomersOrders = async (user: string) => {
  const result = await Order.findOne({ user });
  return result;
};

const updateOrderStatus = async (
  _id: string,
  status: "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED"
) => {
  const result = await Order.findByIdAndUpdate(_id, { status }, { new: true });
  return result;
};

const OrderService = {
  createOrder,
  getAllOrders,
  getCustomersOrders,
  updateOrderStatus,
};

export default OrderService;
