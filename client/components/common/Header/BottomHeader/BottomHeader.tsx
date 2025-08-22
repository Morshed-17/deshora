import { ICategory } from "@/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function BottomHeader({ data }: { data: ICategory[] }) {
  const pathname = usePathname()

  if(pathname === "/shop"){
    return
  }
  return (
    <div className="hidden lg:flex justify-center gap-5 pt-3 pb-5">
      {data?.map((category: ICategory) => {
        return (
          <Link
            key={category._id}
            href={`/shop?category=${category.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary hoverEffect uppercase"
          >
            {category?.title}
          </Link>
        );
      })}
    </div>
  );
}

export default BottomHeader;
