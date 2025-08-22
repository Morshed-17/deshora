"use client";
import PageTitle from "@/components/dashboard/PageTitle";

import React from "react";

import { Button } from "@/components/ui/button";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/types/type";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Edit, Trash } from "lucide-react";
import { AddNewcategoryModal } from "./addNewCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";
import { toast } from "sonner";

function AllCategories() {
  const { data } = useGetAllCategoriesQuery(undefined);
  const categories: ICategory[] = data?.data;
  const [deleteCategory, { isLoading: CategoryLoading }] =
    useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully");
    } catch (error: any) {
      if (error.status === 400)
        toast.error(
          "You can’t delete this category yet — some products are still linked to it. Please remove those products first.",
          { duration: 5000 }
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle>All Categories</PageTitle>
        <div>
          <AddNewcategoryModal />
        </div>
      </div>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px] text-left">Image</TableHead>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Total Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.length > 0 ? (
              <>
                {categories?.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      <AspectRatio ratio={501 / 626}>
                        <Image
                          src={category.image}
                          alt="Category image"
                          fill
                          className="object-cover rounded"
                        />
                      </AspectRatio>
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.title}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="max-w-[200px]  whitespace-normal break-word">
                      <p>{category.description}</p>
                    </TableCell>
                    <TableCell className="font-bold">
                      {category.productCount}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <EditCategoryModal slug={category.slug} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size={"icon"}>
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete this product category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center bg-gray-100 p-6 rounded-lg">
                  No Categoires Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AllCategories;
