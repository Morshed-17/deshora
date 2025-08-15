"use client";
import ProductCard from "@/components/common/Product/ProductCard";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/type";
import React from "react";

function NewArrivals() {
  const { data, isLoading, error } = useGetAllProductsQuery(undefined);
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
