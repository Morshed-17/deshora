"use client";

import { Button } from "@/components/ui/button";
import { ICategory, IProduct } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash, View } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productCollumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "galleryImages",
    header: "Image",
    cell: ({ row }) => {
      const images = row.original?.galleryImages;
      const firstImage = images[0];

      return firstImage ? (
        <Image
          src={firstImage}
          alt={row.original?.title}
          width={50}
          height={50}
          className="rounded-sm object-cover"
        />
      ) : (
        <span>No image</span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original?.categoryId as ICategory;
      const categoryTitle = category?.title;
      return categoryTitle;
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const formatted = format(createdAt, "dd MMM yyyy");
      return formatted;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <Button variant={"ghost"} size={"icon"}>
            <Eye />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Edit />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
