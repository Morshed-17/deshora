"use client";
import React from "react";
import TopHeader from "./TopHeader/TopHeader";
import MiddleHeader from "./MiddleHeader/MiddleHeader";
import BottomHeader from "./BottomHeader/BottomHeader";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

function Header() {
  const { data, isLoading, error } = useGetAllCategoriesQuery(undefined);
  return (
    <div>
      <TopHeader />
      <MiddleHeader data={data?.data} />
      <BottomHeader data={data?.data} />
    </div>
  );
}

export default Header;
