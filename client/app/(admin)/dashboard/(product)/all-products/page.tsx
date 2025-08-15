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
} from "@/components/ui/dialog";

import { Row } from "@tanstack/react-table";
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

function AllProducts() {
  const [open, setOpen] = React.useState(false);
  const { data } = useGetAllProductsQuery(undefined);
  const products = data?.data?.products;
  const [deleteProduct, { isLoading }] = useDeleteAProductMutation();
  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully");
      setOpen(false);
    } catch (err) {
      console.error("Failed to delete the product:", err);
    }
  };

  return (
    <div>
      <PageTitle>All Products</PageTitle>
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
                </Button>
                <Button onClick={() => handleEdit(product)}>
                  <Edit />
                </Button> */}
                <Dialog open={open} onOpenChange={setOpen}>
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
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AllProducts;
