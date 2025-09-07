import { TDeliveryZone } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ICartItem {
  _id: string;
  title: string;
  price: number;
  sku: string;
  quantity: number;
  color: string;
  size?: string ;
  image?: string;
}

interface ICartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  deliveryZone: TDeliveryZone;
  paymentMethod: "COD",
  total: number;
}

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  deliveryZone: "inside-dhaka",
  paymentMethod: "COD",
  total: 0,
};

// 🔹 Helper function to keep total in sync
const calculateTotal = (state: ICartState) => {
  if (state.items.length === 0) {
    state.total = 0;
  } else {
    const deliveryCharge = state.deliveryZone === "inside-dhaka" ? 80 : 130;
    state.total = state.totalPrice + deliveryCharge;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<ICartItem>) => {
      const { _id, title, price, size, image, color, quantity = 1, sku } =
        action.payload;

      const existing = state.items.find(
        (item) => item._id === _id && item.size === size
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          _id,
          title,
          price,
          size,
          image,
          quantity,
          sku,
          color,
        });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;

      calculateTotal(state);

      toast.success("Added to Bag");
    },

    changeDeliveryZone: (
      state,
      action: PayloadAction<"inside-dhaka" | "outside-dhaka">
    ) => {
      state.deliveryZone = action.payload;
      calculateTotal(state);
    },

    increaseQuantity: (state, action) => {
      const { _id, size } = action.payload;

      const item = state.items.find(
        (item) => item._id === _id && item.size === size
      );

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
        calculateTotal(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const { _id, size } = action.payload;

      const item = state.items.find(
        (item) => item._id === _id && item.size === size
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
          calculateTotal(state);
        } else {
          console.log("Quantity can't be less than 1");
        }
      }
    },

    deleteItem: (state, action) => {
      const { _id, size } = action.payload;

      const itemToRemove = state.items.find(
        (item) => item._id === _id && item.size === size
      );

      if (itemToRemove) {
        state.items = state.items.filter(
          (item) => !(item._id === _id && item.size === size)
        );

        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.totalQuantity -= itemToRemove.quantity;

        calculateTotal(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.total = 0;
    },
  },
});

export const {
  addtoCart,
  clearCart,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  changeDeliveryZone,
} = cartSlice.actions;

export default cartSlice.reducer;
