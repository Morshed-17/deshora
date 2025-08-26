"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import CustomInput from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import {
  clearCart,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "@/redux/features/cart/cartSlice";
import { selectCart, useAppSelector } from "@/redux/hooks";
import { ShoppingBag, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function page() {
  const { totalQuantity, items, totalPrice } = useAppSelector(selectCart);
  const dispatch = useDispatch();

  const vat = totalPrice * (5 / 100);
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
    <Container className="min-h-screen">
      <div className="flex items-center justify-between">
        <PageTitle className="flex items-center gap-1 uppercase">
          <ShoppingBag /> Your Bag{" "} ({totalQuantity})
        </PageTitle>
        <Button
          onClick={() => dispatch(clearCart())}
          variant={"ghost"}
          className="underline"
        >
          X Remove All Items{" "}
        </Button>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="flex-2/3  ">
          {items?.length > 0 ? (
            <div className="space-y-4">
              {/* Cart Item */}
              {items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-700 font-semibold">
                      {item.price} BDT
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border ">
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
                      className="px-3 py-1 text-lg hover:bg-gray-100 "
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleDeleteItem(item._id, item.size || "")}
                    className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">
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

        <div className="flex-1/3 ">
          <div className="bg-secondary/5 roundedsm p-6 flex flex-col gap-3">
            {/* Cupon code area */}
            <Label className=" text-base uppercase">Use Cupon Code</Label>
            <div className="flex h-12 gap-3 ">
              <Input
                placeholder="Cupon Code"
                className="h-full bg-white rounded-sm"
              />
              <Button className="bg-secondary h-full rounded-sm">
                Apply Cupon
              </Button>
            </div>

            {/* Total table */}

            <Table>
              <TableBody className="bg-white text-muted-foreground text-base  rounded-sm ">
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
                    0 BDT
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-semibold p-3 border">
                    VAT (5%)
                  </TableCell>
                  <TableCell className="font-medium p-3 border">
                    {vat} BDT
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold p-3 border">
                    Total
                  </TableCell>
                  <TableCell className="font-medium p-3 border">
                    {vat + totalPrice - discount} BDT
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Checkout button */}
            <div className="flex gap-3 h-12 ">
              <Link href={"/shop"} className="flex-1">
                <Button className=" bg-secondary w-full h-full uppercase text-base">
                  Continue Shopping
                </Button>
              </Link>
              <Link href={"/checkout"} className="flex-1">
                <Button className=" bg-primary w-full h-full uppercase text-base hover:bg-secondary">
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

export default page;
