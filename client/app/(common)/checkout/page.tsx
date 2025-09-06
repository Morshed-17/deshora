"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MapPin, CreditCard, User, Truck } from "lucide-react";

import { selectCart, useAppDispatch, useAppSelector } from "@/redux/hooks";

import OrderSummary from "./_components/OrderSummary";

import { changeDeliveryZone } from "@/redux/features/cart/cartSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Full name must be at least 2 characters." }),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { error: "Enter a valid phone number." }),
  email: z.string().email({ error: "Enter a valid email address." }),
  address: z
    .string({ error: "Address is required" })
    .min(3, { error: "Delivery Adress must be atleast 3 characters" }),
});
const CheckoutPage = () => {
  const {
    items,
    totalPrice,
    totalQuantity,
    total,
    deliveryZone,
    paymentMethod,
  } = useAppSelector(selectCart);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Review your order and complete your purchase
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-2 gap-8 space-y-6"
          >
            {/* Customer Information */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="h-5 w-5 text-primary" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Textarea
                              className="mt-1 min-h-[80px]"
                              placeholder="Enter your complete delivery address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">
                        Delivery Zone:{" "}
                      </span>
                    </div>
                    <RadioGroup defaultValue={deliveryZone}>
                      <div
                        className="flex items-center gap-3"
                        onClick={() =>
                          dispatch(changeDeliveryZone("inside-dhaka"))
                        }
                      >
                        <RadioGroupItem value="inside-dhaka" id="r1" />
                        <Label htmlFor="r1">Inside Dhaka: 80 ৳</Label>
                      </div>
                      <div
                        className="flex items-center gap-3"
                        onClick={() =>
                          dispatch(changeDeliveryZone("outside-dhaka"))
                        }
                      >
                        <RadioGroupItem value="outside-dhaka" id="r2" />
                        <Label htmlFor="r2">Outside Dhaka: 130 ৳</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue={paymentMethod}>
                    <div className="">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="COD" id="r2" />
                          <div className="flex flex-col">
                            <Label htmlFor="r2">Cash On Delivery</Label>
                            <span className="text-sm text-muted-foreground">
                              Pay after receiving your order
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">Popular</Badge>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className=" lg:col-span-1">
              <OrderSummary
                items={items}
                deliveryZone={deliveryZone}
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
                total={total}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
