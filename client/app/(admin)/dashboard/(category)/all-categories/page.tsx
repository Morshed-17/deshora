"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import React from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { productCollumns } from "./category-columns";

function AllCategories() {
  const { data } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data


  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle>All Categories</PageTitle>
        <div>
          <Button variant={"outline"}>Add New Category</Button>
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={productCollumns}
          data={Array.isArray(categories) ? categories : []}
        />
      </div>
    </div>
  );
}

export default AllCategories;
