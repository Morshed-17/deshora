import { cn } from "@/lib/utils";
import React from "react";

function Taka({ className }: { className?: string }) {
  return <span className={cn("text-base", className)}>৳</span>;
}

export default Taka;
