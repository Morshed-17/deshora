"use client";
import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader/TopHeader";
import MiddleHeader from "./MiddleHeader/MiddleHeader";
import BottomHeader from "./BottomHeader/BottomHeader";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Trigger when scrolling past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { data, isLoading, error } = useGetAllCategoriesQuery(undefined);
  return (
    <div>
      {!scrolled && <TopHeader />} {/* TopHeader only visible at top */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "fixed top-0 w-full bg-white z-50 shadow-md" : ""
        }`}
      >
        <MiddleHeader data={data?.data} />
        <BottomHeader data={data?.data} />
      </div>
    </div>
  );
}

export default Header;
