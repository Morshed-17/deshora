"use client";
import { loginUserSchema } from "@/schema/authSchema";
import React from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/ui/custom-input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Loader } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

type FormData = z.infer<typeof loginUserSchema>;

function LoginForm() {
  const [login, { error, isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const res = await login(values).unwrap();
    
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  type="email"
                  {...field}
                  placeholder="Enter Your Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  type="password"
                  {...field}
                  placeholder="Enter A Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <Button
            className="w-full h-12 rounded-md text-base uppercase"
            variant={"secondary"}
            type="submit"
            disabled
          >
            <Loader className="animate-spin" /> Loggin in...
          </Button>
        ) : (
          <Button
            className="w-full h-12 rounded-md text-base uppercase"
            variant={"secondary"}
            type="submit"
          >
            Login Now
          </Button>
        )}
      </form>
    </Form>
  );
}

export default LoginForm;
