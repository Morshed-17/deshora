"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import React from "react";
import { productCollumns } from "./product-columns";
import { DataTable } from "../../../../components/ui/data-table";
import { Button } from "@/components/ui/button";

function AllProducts() {
  const { data } = useGetAllProductsQuery(undefined);
  const products = data?.data?.products;

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle>All Products</PageTitle>
        <div>
          <Button variant={"outline"}>Add New Product</Button>
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={productCollumns}
          data={Array.isArray(products) ? products : []}
        />
      </div>
    </div>
  );
}

export default AllProducts;
