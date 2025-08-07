import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import Link from "next/link";
import React from "react";

function TopHeader() {
  return (
    <div className="border-b border-black/5">
      <Container className=" mx-auto flex items-center justify-between text-sm text-muted-foreground h-14 ">
        <div>
          {" "}
          <p>Sailing Life</p>
        </div>
        <div className="flex items-center gap-5">
          <Link href={"/login"} className="hover:text-primary hoverEffect">
            Log In
          </Link>
          <Link href={"/#"} className="hover:text-primary hoverEffect">
            About Us
          </Link>
          <Link href={"/wishlist"} className="hover:text-primary hoverEffect">
            My Wishlist
          </Link>
          <Link href={"/cart"} className="hover:text-primary hoverEffect">
            Cart
          </Link>
          <Link href={"/compare"} className="hover:text-primary hoverEffect">
            Compare(0)
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default TopHeader;
