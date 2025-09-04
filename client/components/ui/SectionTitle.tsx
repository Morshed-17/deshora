import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string
}

function SectionTitle({ children, className }: Props) {
  return (
    <h2 className={cn("text-xl font-medium md:text-2xl lg:text-2xl  text-foreground pt-8 pb-6 text-center", className)}>
      {children}
    </h2>
  );
}

export default SectionTitle;
