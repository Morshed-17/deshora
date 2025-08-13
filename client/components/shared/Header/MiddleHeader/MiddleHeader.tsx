import Container from "@/components/ui/Container";
import React from "react";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import { Heart, MenuIcon, Phone, SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import BottomHeader from "../BottomHeader/BottomHeader";
import { ICategory } from "@/types/type";

function MiddleHeader({ data }: { data: ICategory[] }) {
  return (
    <>
      <div className="hidden lg:block py-2 border-b border-black/5">
        <Container className="flex items-center justify-between ">
          <div className="w-1/6">
            <Logo />
          </div>

          {/* search with category */}
          <div className="w-5/12 mx-12">
            <SearchWithCategory data={data} />
          </div>

          {/* Phone number */}
          <div className="flex items-center gap-3 fle w-1/6">
            <Phone size={18} />
            <div>
              <h4 className="text-accent-foreground text-xs font-medium">
                Call Us Now
              </h4>
              <h4 className="text-foreground text-sm font-medium">
                01777702000
              </h4>
            </div>
          </div>

          {/* cart and wishlist */}
          <div className="flex items-center gap-5 w-1/4 justify-end">
            <Link href={"/cart"} className="flex gap-2 items-center">
              <Heart size={20} className="text-muted-foreground" />
              <sup>0</sup>
            </Link>
            <Link href={"/cart"} className="flex gap-2 items-center">
              <ShoppingCart size={20} className="text-muted-foreground" />
              <sup>0</sup>
            </Link>
          </div>
        </Container>
      </div>

      {/* for tablet and mobile layout */}

      <div className="lg:hidden flex items-center py-2 px-5">
        {/* Left side */}
        <div className="flex-1 flex justify-start">
          <MenuIcon className="h-5 w-5 md:h-8 md:w-8text-accent-foreground" />
        </div>

        {/* Center */}
        <div className="flex-1 flex justify-center">
          <Logo />
        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-end">
          <SearchIcon className="h-5 w-5 md:h-8 md:w-8text-accent-foreground" />
        </div>
      </div>
    </>
  );
}

export default MiddleHeader;
