import { cn } from "@/lib/utils";
import React from "react";

function Container({
  children,
  className,
  full = false,
}: {
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <>
      {full ? (
        <div className={cn("w-full mx-auto px-3", className)}>{children}</div>
      ) : (
        <div
          className={cn(
            "max-w-[540px] sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3 md:px-4 lg:px-16",
            className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Container;
