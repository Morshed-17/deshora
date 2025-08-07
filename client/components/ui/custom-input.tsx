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
        "text-base px-5 h-12 border rounded-sm  border-secondary/60 placeholder:font-medium placeholder:text-secondary/40 placeholder:text-base font-medium ",
        className
      )}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      {...props}
    />
  );
}

export default CustomInput;
