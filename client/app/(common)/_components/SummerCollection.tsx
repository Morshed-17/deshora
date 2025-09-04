"use client";
import ProductCard from "@/components/common/Product/ProductCard";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/type";
import React from "react";

function SummerCollection() {
  const queryObject = {
    sortBy: "-createdAt",
    page: 1,
    limit: 5,
  };
  // Convert arrays to comma-separated strings
  const formattedQuery = Object.fromEntries(
    Object.entries(queryObject).map(([key, value]) => {
      if (Array.isArray(value)) return [key, value.join(",")];
      return [key, String(value)];
    })
  );

  const params = new URLSearchParams(formattedQuery);

  const { data } = useGetAllProductsQuery(params.toString());
  const products = data?.data?.products;
  return (
    <Container full>
      <SectionTitle className="text-left">Summer Collections</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {products?.map((product: IProduct) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Container>
  );
}

export default SummerCollection;
