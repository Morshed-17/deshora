"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import {
  useDeleteAProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { IProduct } from "@/types/type";
import { Edit, Eye, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { usePagination } from "@/hooks/usePagination";

import PaginationControls from "@/components/ui/PaginationControls";

function AllProducts() {
  const { page, setPage, limit } =
    usePagination(5);

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  const { data } = useGetAllProductsQuery(searchParams.toString());
  const products = data?.data?.products;
  const [deleteProduct, { isLoading }] = useDeleteAProductMutation();

  const handleDelete = async (productId: string) => {
    console.log(productId);
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Failed to delete the product:", err);
      toast.error("Something went wrong");
    }
  };

  const meta = data?.data?.meta;

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle>All Products</PageTitle>
        <Link href={"/dashboard/create-product"}>
          <Button variant={"outline"}>Add New Product</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products?.length > 0 ? (
            <>
              {products?.map((product: IProduct) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Image
                      src={product.galleryImages[0]}
                      width={50}
                      height={50}
                      alt={product.title}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.categoryIds.map((category) => (
                      <span key={category._id} className="text-xs">
                        {category.title} <br />
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {/* <Button onClick={() => handleView(product)}>
                  <Eye />
                </Button> */}
                    <Link href={`/dashboard/edit-product/${product.sku}`}>
                      <Button variant={"ghost"}>
                        <Edit />
                      </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size={"icon"}>
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this product?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center bg-gray-100 p-6 rounded-lg "
              >
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationControls meta={meta} page={page} setPage={setPage} />
    </div>
  );
}

export default AllProducts;
