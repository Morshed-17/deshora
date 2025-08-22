"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader, { GalleryItem } from "@/components/ui/ImageUploader";
import SizesForm from "./size-form";
import { useCreateNewProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Loader } from "lucide-react";
import { ICategory } from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(1, "Product name is required"),
  categoryIds: z.string().array().min(1, "Category is required"),
  color: z.string().optional(),
  description: z.string().optional(),
  price: z
    .number({ message: "Please enter price" })
    .positive("Price must be positive"),
  hasSizes: z.boolean(), // ✅ New field
  stock: z.number().min(0, "Stock cannot be negative").optional(),
  sizesAvailable: z.array(
    z.object({
      size: z.string().min(1, "Size is required"),
      stock: z.number().min(0, "Stock cannot be negative"),
    })
  ),

  galleryImages: z.any().nullable(), // files will be handled separately
});

function page() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const { data: result, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(undefined);

  const categoryResult = result?.data;

  const [createNewProduct, { error, isLoading: productLoading }] =
    useCreateNewProductMutation();

  useEffect(() => {
    setCategories(categoryResult);
  }, [categoryLoading]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      color: "",
      description:
        "Deshora Shirts combine style and comfort for everyday wear. Crafted with quality fabrics and attention to detail, they offer a perfect fit and lasting durability. From casual outings to semi-formal occasions, our shirts keep you looking sharp while embracing modern Bangladeshi fashion",
      price: 0,
      galleryImages: null, // default for file input
      hasSizes: true,
      categoryIds: [],
      stock: 0,
      sizesAvailable: [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Only append new files
    galleryItems
      .filter((item) => item.type === "file")
      .forEach((item) => formData.append("file", item.file));

    // Append the rest of the product data as JSON
    const { galleryImages, ...rest } = data; // galleryImages is null for create
    formData.append("data", JSON.stringify(rest));

    try {
      const res = await createNewProduct(formData).unwrap();
      toast.success("Product Added Successfully");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <PageTitle>Create New Product</PageTitle>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1 space-y-5">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter color (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gallery Images */}
              <FormField
                control={form.control}
                name="galleryImages"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Product Images (First image will be the cover image).
                    </FormLabel>
                    <FormLabel>
                      Image size must be{" "}
                      <span className="text-primary underline">
                        (1600 X 2000)
                      </span>{" "}
                      px
                    </FormLabel>
                    <ImageUploader
                      value={galleryItems}
                      onChange={setGalleryItems}
                    />
                  </FormItem>
                )}
              />
            </div>

            {/* Sizes Form */}
            <div className="flex-1 mt-5 md:mt-0 flex flex-col gap-5">
              {/* Category */}

              <FormField
                control={form.control}
                name="categoryIds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Category of the product
                      </FormLabel>
                    </div>
                    {categories?.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="categoryIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.title}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("hasSizes") ? (
                <FormField
                  control={form.control}
                  name="sizesAvailable"
                  render={({ field }) => (
                    <SizesForm
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="hasSizes"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(!!checked);

                          if (checked) {
                            // Initialize sizesAvailable if empty
                            const current = form.getValues("sizesAvailable");
                            if (
                              !Array.isArray(current) ||
                              current.length === 0
                            ) {
                              form.setValue("sizesAvailable", [
                                { size: "", stock: 0 },
                              ]);
                            }
                          } else {
                            // Clear sizesAvailable when switching off
                            form.setValue("sizesAvailable", []);
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel>Has Sizes?</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}

          {productLoading ? (
            <Button disabled className="w-full">
              <Loader className="animate-spin"></Loader> Adding product..
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default page;
