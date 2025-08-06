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
    <Input
      className={cn(
        "text-base px-5 h-12 border focus-visible:ring-0 rounded-sm border-primary/30 placeholder:font-medium placeholder:text-primary/60 placeholder:text-base",
        className
      )}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      {...props}
    />
  );
}

export default CustomInput;
