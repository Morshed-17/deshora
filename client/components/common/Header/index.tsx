"use client";

import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader/TopHeader";
import MiddleHeader from "./MiddleHeader/MiddleHeader";
import BottomHeader from "./BottomHeader/BottomHeader";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { usePathname, useSearchParams } from "next/navigation";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useGetAllCategoriesQuery(undefined);

  // ✅ "Home" means `/` with or without query params
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return; // no scroll logic for non-home pages

    const handleScroll = () => {
      // Only trigger sticky if user has actually scrolled
      setScrolled(window.scrollY > 50);
    };

    // Run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, searchParams]); // re-run when query changes

  return (
    <header className="relative">
      {isHome && !scrolled && <TopHeader />}

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
            : "relative"
        }`}
      >
        <MiddleHeader data={data?.data} />
        {isHome && !scrolled && <BottomHeader data={data?.data} />}
      </div>

      {/* Spacer to prevent layout jump */}
      {scrolled && <div className="h-[60px]" />}
    </header>
  );
}

export default Header;
