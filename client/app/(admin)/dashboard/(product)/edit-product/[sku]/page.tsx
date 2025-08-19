"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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

import {
  useCreateNewProductMutation,
  useEditAProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductBySkuQuery,
} from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Loader } from "lucide-react";
import { ICategory, IProduct } from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";
import SizesForm from "../../create-product/size-form";
import { useParams } from "next/navigation";

const formSchema = z.object({
  title: z.string().optional(),
  categoryIds: z.string().array().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  price: z
    .number({ message: "Please enter price" })
    .positive("Price must be positive")
    .optional(),
  hasSizes: z.boolean().optional(), // ✅ New field
  stock: z.number().min(0, "Stock cannot be negative").optional(),
  sizesAvailable: z.array(
    z
      .object({
        size: z.string().min(1, "Size is required"),
        stock: z.number().min(0, "Stock cannot be negative"),
      })
      .optional()
  ),

  galleryImages: z.any().nullable().optional(), // files will be handled separately
});

function EditProduct() {
  const { sku } = useParams<{ sku: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const { data, isLoading: productLoading } =
    useGetSingleProductBySkuQuery(sku);

  const oldProduct = data?.data;
  const { data: result, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(undefined);

  const categoryResult = result?.data;

  const [editProduct, { error, isLoading: editProductLoading }] =
    useEditAProductMutation();

  //   useEffect(() => {

  //   }, []);
  // when oldProduct loads, reset form values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: oldProduct?.title || "",
      color: oldProduct?.color || "",
      description: oldProduct?.description || "",
      price: oldProduct?.price || 0,
      galleryImages: oldProduct?.galleryImages || [], // default for file input
      hasSizes: oldProduct?.hasSizes || false,
      categoryIds: oldProduct?.categoryIds,
      stock: oldProduct?.stock || 0,
      sizesAvailable: oldProduct?.sizesAvailable || [],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "sizesAvailable",
  });
  useEffect(() => {
    setCategories(categoryResult);

    if (oldProduct) {
      form.reset({
        title: oldProduct.title,
        color: oldProduct.color,
        description: oldProduct.description,
        price: oldProduct.price,
        galleryImages: oldProduct.galleryImages,
        hasSizes: oldProduct.hasSizes,
        categoryIds: oldProduct.categoryIds, // careful if it's object[]
        stock: oldProduct.stock,
        sizesAvailable: oldProduct.sizesAvailable,
      });
      // Set existing images for ImageUploader
      setExistingImages(oldProduct.galleryImages || []);
    }
  }, [oldProduct, form, categoryLoading]);

  const galleryItems: GalleryItem[] = [
    ...existingImages.map((url) => ({ type: "url" as const, url })),
    ...galleryFiles.map((file) => ({ type: "file" as const, file })),
  ];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Add new files
    galleryFiles.forEach((file) => formData.append("file", file));

    // Merge existing images into main data object
    const dataToSend = {
      ...data,
      galleryImages: existingImages, // existing images as part of main object
    };

    // Append the entire object as JSON
    formData.append("data", JSON.stringify(dataToSend));

    try {
      const res = await editProduct({ sku, formData }).unwrap();
      toast.success("Product Edited Successfully");
      setGalleryFiles([]);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <PageTitle>Edit Product</PageTitle>

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
                      onChange={(items) => {
                        setGalleryFiles(
                          items
                            .filter((i) => i.type === "file")
                            .map((i) => i.file)
                        );
                        setExistingImages(
                          items
                            .filter((i) => i.type === "url")
                            .map((i) => i.url)
                        );
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>

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
                                    const current = field.value || [];

                                    if (checked) {
                                      field.onChange([...current, item.id]);
                                    } else {
                                      field.onChange(
                                        current.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                    }
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

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2 items-center">
                  <Controller
                    control={form.control}
                    name={`sizesAvailable.${index}.size`}
                    render={({ field }) => (
                      <Input placeholder="Size" {...field} />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`sizesAvailable.${index}.stock`}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="Stock"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  <Button variant="ghost" onClick={() => remove(index)}>
                    Delete
                  </Button>
                </div>
              ))}
              {oldProduct?.hasSizes && (
                <Button
                  onClick={() => append({ size: "", stock: 0 })}
                  className="mt-2"
                  variant={"secondary"}
                >
                  + Add Size
                </Button>
              )}

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={oldProduct?.hasSizes}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}

          {editProductLoading ? (
            <Button disabled className="w-full">
              <Loader className="animate-spin"></Loader> Editing product..
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Edit Product
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default EditProduct;
