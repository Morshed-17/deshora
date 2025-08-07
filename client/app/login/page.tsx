"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function LoginPage() {
  const [toggle, setToggle] = useState<"login" | "register">("login");
  const isLogin = toggle === "login";
  const isRegister = toggle === "register";

  return (
    <div>
      <div className="h-16  flex justify-center items-end border-b-2 ">
        <div className="max-w-sm flex w-full px-5 ">
          <button
            onClick={() => setToggle("login")}
            className={cn(
              "py-2 px-2   font-medium text-foreground text-sm cursor-pointer border-b-2 border-transparent flex-1",
              isLogin &&
                "border-b-2 border-primary text-primary focus:outline-none"
            )}
          >
            Login
          </button>

          <button
            onClick={() => setToggle("register")}
            className={cn(
              "py-2 px-2   font-medium text-foreground text-sm cursor-pointer border-b-2 border-transparent flex-1",
              isRegister &&
                "border-b-2 border-primary text-primary focus:outline-none"
            )}
          >
            Registration
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-6 max-w-sm mx-auto">
        <div className="w-full">
          {isLogin && <LoginForm />}

          {isRegister && <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
