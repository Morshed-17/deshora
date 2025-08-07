import Container from "@/components/ui/Container";
import React from "react";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import { Heart, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";

function MiddleHeader() {
  return (
    <div className="py-2 border-b border-black/5">
      <Container className="flex items-center justify-between ">
        <div className="w-1/6">
          <Logo />
        </div>

        {/* search with category */}
        <div className="w-5/12 mx-12">
          <SearchWithCategory />
        </div>

        {/* Phone number */}
        <div className="flex items-center gap-3 fle w-1/6">
          <Phone size={18} />
          <div>
            <h4 className="text-accent-foreground text-xs font-medium">
              Call Us Now
            </h4>
            <h4 className="text-foreground text-sm font-medium">01777702000</h4>
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
  );
}

export default MiddleHeader;
