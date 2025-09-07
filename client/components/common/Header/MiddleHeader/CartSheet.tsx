"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ICartItem } from "@/redux/features/cart/cartSlice";
import { ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

function CartSheet({
  items,
  className,
  totalPrice,
  totalQuantity,
  deleteItem,
}: {
  items: ICartItem[];
  totalPrice: number;
  className?: string;
  totalQuantity: number;
  deleteItem: (_id: string, size: string) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center relative p-2 cursor-pointer">
          <ShoppingCart size={20} className={cn("text-muted-foreground")} />
          {totalQuantity > 0 && (
            <div className="absolute -right-2 -top-2 bg-primary text-white text-xs rounded-full px-1">
              {totalQuantity}
            </div>
          )}
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[400px] sm:w-[450px] flex flex-col p-0"
      >
        {/* Header */}
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-lg font-semibold">
            Shopping Bag ({totalQuantity})
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-4 py-4 space-y-3",
            className
          )}
        >
          {items?.length > 0 ? (
            items.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border rounded-lg p-2"
              >
                {/* Image */}
                <div className="w-16 h-20 shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={product.image || ""}
                    alt={product.title}
                    width={64}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col text-sm">
                  <p className="font-medium line-clamp-1">{product.title}</p>
                  <p className="text-primary font-semibold">৳{product.price}</p>
                  <div className="flex gap-2 text-muted-foreground text-xs">
                    <span>Size: {product.size}</span>
                    <span>Qty: {product.quantity}</span>
                    <span>Color: {product.color}</span>
                  </div>
                </div>

                {/* Remove button */}
                <Button
                  onClick={() => deleteItem(product._id, product.size || "")}
                  size="icon"
                  variant="ghost"
                  className="hover:text-red-500 hover:bg-red-100"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm mt-10">
              Your bag is empty.
            </p>
          )}
        </div>

        {/* Footer */}
        {items?.length > 0 && (
          <div className="border-t px-4 py-4 space-y-4">
            <div className="flex justify-between text-sm font-semibold">
              <p>Subtotal</p>
              <p className="text-primary">৳ {totalPrice}</p>
            </div>
            <div className="flex gap-3">
              <SheetClose asChild>
                <Link href="/cart" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Bag
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/checkout" className="flex-1">
                  <Button className="w-full">Checkout</Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
