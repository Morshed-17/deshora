"use client";
import PageTitle from "@/components/dashboard/PageTitle";

import React from "react";

import { Button } from "@/components/ui/button";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

function AllCategories() {
  const { data } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle>All Categories</PageTitle>
        <div>
          <Button variant={"outline"}>Add New Category</Button>
        </div>
      </div>
      <div className="mt-5"></div>
    </div>
  );
}

export default AllCategories;
