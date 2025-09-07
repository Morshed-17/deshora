// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICartItem } from "@/redux/features/cart/cartSlice";
import { TDeliveryZone } from "@/types/type";
import {
  CheckCircle,
  Loader2,
  MousePointer,
  Phone,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface OrderSummaryProps {
  items: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
  deliveryZone: TDeliveryZone;
  total: number;
  isLoading: boolean;
}

function OrderSummary({
  items,
  isLoading,
  totalPrice,
  totalQuantity,
  deliveryZone,
  total,
}: OrderSummaryProps) {
  const deliveryFee = deliveryZone === "inside-dhaka" ? 80 : 130;
  return (
    <div className="lg:sticky lg:top-8 lg:h-fit">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Order Summary
          </CardTitle>
          <CardDescription>
            {totalQuantity} item{totalQuantity ? "s" : ""} in your cart
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-accent/20"
              >
                <Image
                  src={item.image || ""}
                  alt={item.title}
                  width={40}
                  height={60}
                  className="w-12 h-12 object-contain"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>Size: {item.size}</span>
                    <span>•</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {item.price * item.quantity} BDT
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.price} each
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-foreground">
              <span>Subtotal</span>
              <span>{totalPrice} BDT</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Delivery Fee</span>
              <span>{deliveryFee} BDT</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>{total} BDT</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full mt-6 h-12 text-base font-semibold uppercase"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin size-6"></Loader2> Ordering...
              </>
            ) : (
              <>
                Confirm Order <MousePointer />
              </>
            )}
          </Button>

          {/* Trust Badges */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-blue-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-orange-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderSummary;
