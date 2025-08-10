import { cn } from "@/lib/utils";
import { Input } from "./input";
import React from "react";

function CustomInput({
  className,
  placeholder,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "text-base px-5 h-12  rounded-sm bg-gray-100 focus:bg-white  placeholder:font-medium placeholder:text-black/40 placeholder:text-base font-medium   outline-1 outline-secondary/50",
        className
      )}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      {...props}
    />
  );
}

export default CustomInput;
