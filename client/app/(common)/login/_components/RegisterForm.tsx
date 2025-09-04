"use client";
import { registerUserSchema } from "@/schema/authSchema";
import React from "react";

import z, { email } from "zod";
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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Clover, Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof registerUserSchema>;

interface Props {
  setToggle: (value: "login" | "register") => void;
}

function RegisterForm({ setToggle }: Props) {
  const [register, { error, isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await register(userInfo).unwrap();
      if (res.success) {
        toast.success("Account created sccuessfully. Now please log in.");
        setToggle("login");
      }
    } catch (error: any) {
      if(error.status === 409){

        toast.error("This email is already registerd");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput {...field} placeholder="Enter Your Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  type="password"
                  {...field}
                  placeholder="Enter Confirm-Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button
            className="w-full h-12 rounded-md text-base uppercase"
            type="submit"
            variant={"secondary"}
            disabled
          >
            <Loader className="animate-spin" /> Creating Account...
          </Button>
        ) : (
          <Button
            className="w-full h-12 rounded-md text-base uppercase"
            type="submit"
            variant={"secondary"}
          >
            Create An Account
          </Button>
        )}
      </form>
    </Form>
  );
}

export default RegisterForm;
