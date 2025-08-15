"use client";

import { Button } from "@/components/ui/button";
import { ICategory, IProduct } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash, View } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productCollumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          
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
