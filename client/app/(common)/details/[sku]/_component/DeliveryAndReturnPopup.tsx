"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export default function DeliveryReturnPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="flex items-center gap-1 underline font-medium cursor-pointer"><Truck size={16}/>Delivery & Return Policy </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Delivery & Return Policy
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please read our delivery rates and return policies carefully.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <section>
            <h3 className="text-muted-foreground font-semibold">
              Delivery Rates
            </h3>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Dhaka: ৳60 per order</li>
              <li>Outside Dhaka: ৳120 per order</li>
            </ul>
          </section>

          <section>
            <h3 className="text-muted-foreground font-semibold">
              Return Policy
            </h3>
            <p className="text-muted-foreground mt-2">
              You can return products within 7 days of delivery if they are
              defective or damaged. Returns must be in original packaging.
              Refunds are processed within 3-5 business days.
            </p>
          </section>
        </div>

        <div className="mt-6 text-right">
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
