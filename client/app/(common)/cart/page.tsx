"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  clearCart,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "@/redux/features/cart/cartSlice";
import { selectCart, useAppSelector } from "@/redux/hooks";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function CartPage() {
  const { totalQuantity, items, totalPrice, total } =
    useAppSelector(selectCart);
  const dispatch = useDispatch();

  const discount = 0;

  // Delete cart item
  const handleDeleteItem = (_id: string, size: string | undefined) => {
    dispatch(deleteItem({ _id, size }));
    toast.success("Item removed from cart");
  };

  const handleIncreaseQuantity = (_id: string, size: string | undefined) => {
    dispatch(increaseQuantity({ _id, size }));
    toast.success("Quantity updated");
  };
  const handleDecreaseQuantity = (
    _id: string,
    size: string | undefined,
    quantity: number
  ) => {
    if (quantity === 1) {
      return toast.error("Quantity can't be less than 1");
    }
    dispatch(decreaseQuantity({ _id, size }));
    toast.success("Quantity updated");
  };

  return (
    <Container className="min-h-screen my-6 md:my-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <PageTitle className="flex items-center gap-1 uppercase text-lg sm:text-xl">
          <ShoppingBag /> Your Bag ({totalQuantity})
        </PageTitle>
        <Button
          onClick={() => dispatch(clearCart())}
          variant={"ghost"}
          className="underline text-sm sm:text-base self-start sm:self-auto"
        >
          X Remove All Items
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Cart Items */}
        <div className="flex-1">
          {items?.length > 0 ? (
            <div className="space-y-4">
              {items?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-md"
                >
                  <Image
                    src={item.image || ""}
                    alt={item.title}
                    width={64}
                    height={80}
                    className="object-cover mx-auto sm:mx-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-medium">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-700 font-semibold">
                      {item.price} BDT
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-md self-center">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(
                          item._id,
                          item.size,
                          item.quantity
                        )
                      }
                      className="px-3 py-1 text-lg hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(item._id, item.size)
                      }
                      className="px-3 py-1 text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleDeleteItem(item._id, item.size || "")}
                    className="ml-0 sm:ml-4 text-red-500 hover:text-red-700 font-semibold self-center"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                Your Bag Is Empty! 🥲
              </h3>
              <Link href="/shop">
                <Button className="px-6 py-2 bg-accent-foreground text-white rounded-lg shadow-md transition">
                  Add Items from Shop
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-secondary/5 rounded-md p-6 flex flex-col gap-4">
            {/* Coupon code area */}
            <Label className="text-sm sm:text-base uppercase">
              Use Coupon Code
            </Label>
            <div className="flex flex-col sm:flex-row h-auto sm:h-12 gap-3">
              <Input
                placeholder="Coupon Code"
                className="bg-white rounded-sm flex-1 h-full"
              />
              <Button className="bg-secondary h-12 rounded-sm w-full sm:w-auto">
                Apply
              </Button>
            </div>

            {/* Total table */}
            <Table>
              <TableBody className="bg-white text-gray-700 text-sm sm:text-base rounded-sm">
                <TableRow>
                  <TableCell className="font-semibold p-3 border">
                    Sub-Total
                  </TableCell>
                  <TableCell className="font-medium p-3 border">
                    {totalPrice} BDT
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold p-3 border">
                    Discount
                  </TableCell>
                  <TableCell className="font-medium p-3 border">
                    {discount} BDT
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold p-3 border">
                    Total
                  </TableCell>
                  <TableCell className="font-medium p-3 border">
                    {total} BDT
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Checkout buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={"/shop"} className="flex-1">
                <Button className="bg-secondary w-full h-12 uppercase text-sm sm:text-base">
                  Continue Shopping
                </Button>
              </Link>
              <Link href={"/checkout"} className="flex-1">
                <Button className="bg-primary w-full h-12 uppercase text-sm sm:text-base hover:bg-secondary">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
