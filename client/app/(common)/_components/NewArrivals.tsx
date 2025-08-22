"use client";
import ProductCard from "@/components/common/Product/ProductCard";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/type";
import React from "react";

function NewArrivals() {
  const queryObject = {
    sortBy: "-createdAt",
    page: 1,
    limit: 10,
  };
  // Convert arrays to comma-separated strings
  const formattedQuery = Object.fromEntries(
    Object.entries(queryObject).map(([key, value]) => {
      if (Array.isArray(value)) return [key, value.join(",")];
      return [key, String(value)];
    })
  );

  const params = new URLSearchParams(formattedQuery);

  const { data, isLoading, error } = useGetAllProductsQuery(params.toString());
  const products = data?.data?.products;
  return (
    <Container full>
      <SectionTitle>New Arrivals</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {products?.map((product: IProduct) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Container>
  );
}

export default NewArrivals;
