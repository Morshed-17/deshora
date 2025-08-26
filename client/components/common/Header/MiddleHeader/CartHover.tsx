import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ICartItem } from "@/redux/features/cart/cartSlice";
import { Trash } from "lucide-react";
import Link from "next/link";

function CartHover({
  items,
  className,
  totalPrice,
  totalQuantity,
  deleteItem,
}: {
  items: ICartItem[];
  totalPrice: number;
  className?: string;
  totalQuantity: number
  deleteItem: (_id: string, size: string) => void;
}) {
  return (
    <div className={cn("", className)}>
      <div className="w-[400px] p-4  shadow-lg space-y-4 border">
        <h3 className="text-lg font-semibold border-b pb-2">
          Shopping Bag ({totalQuantity})
        </h3>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 ">
          {items?.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-3  bg-muted/50 p-2 border"
            >
              {/* Image */}
              <div className="w-16 h-20  overflow-hidden">
                <img
                  src={product.image!}
                  alt="product Image"
                  className="object-cover"
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
                className="text-muted-foreground hover:text-red-500 hover:bg-red-100 rounded-xs"
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm font-semibold">
          <p>Sub Total:</p>
          <p className="text-primary">৳ {totalPrice}</p>
        </div>

        {/* Checkout button */}
        <div className="flex gap-3">
          <Link href={"/cart"} className="flex-1">
            <Button className=" bg-secondary w-full">View Shopping Bag</Button>
          </Link>
          <Link href={"/checkout"} className="flex-1">
            <Button className=" bg-primary w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartHover;
