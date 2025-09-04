
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ICartItem {
  _id: string;
  title: string;
  price: number;
  sku: string;
  quantity: number;
  color: string;
  size?: string;
  image?: string;
}

interface ICartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<ICartItem>) => {
      const {
        _id,
        title,
        price,
        size,
        image,
        color,
        quantity = 1,
        sku,
      } = action.payload;
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

      toast.success("Added to Bag")
    },
    increaseQuantity: (state, action) => {
      const { _id, size } = action.payload;

      const itemToIncreaseQuantity = state.items.find(
        (item) => item._id === _id && item.size === size
      );

      const indexOfTheItem = state.items.indexOf(itemToIncreaseQuantity!);

      state.items[indexOfTheItem] = {
        ...itemToIncreaseQuantity!,
        quantity: itemToIncreaseQuantity!.quantity + 1,
      };

      state.totalQuantity += 1;

      state.totalPrice += itemToIncreaseQuantity!.price;
    },

    decreaseQuantity: (state, action) => {
      const { _id, size } = action.payload;

      const itemToDecreaseQuantity = state.items.find(
        (item) => item._id === _id && item.size === size
      );

      const indexOfTheItem = state.items.indexOf(itemToDecreaseQuantity!);

      if (itemToDecreaseQuantity?.quantity === 1) {
        console.log("Quantity can't be less than 1");
      } else {
        state.items[indexOfTheItem] = {
          ...itemToDecreaseQuantity!,
          quantity: itemToDecreaseQuantity!.quantity - 1,
        };
        state.totalQuantity -= 1;
        state.totalPrice -= itemToDecreaseQuantity!.price;
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
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addtoCart,
  clearCart,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
