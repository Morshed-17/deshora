"use client";
import PageTitle from "@/components/dashboard/PageTitle";
import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { file, z } from "zod";
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
import ImageUploader from "@/components/ui/ImageUploader";
import SizesForm from "./size-form";
import { useCreateNewProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Product name is required"),
  color: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string(),
  price: z
    .number({ message: "Please enter price" })
    .positive("Price must be positive"),
  sizesAvailable: z.array(
    z.object({
      size: z.string().min(1, "Size is required"),
      stock: z.number().min(0, "Stock cannot be negative"),
    })
  ),

  galleryImages: z.any().nullable(), // files will be handled separately
});

function page() {
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [createNewProduct, { error, isLoading }] =
    useCreateNewProductMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Men trouser",
      color: "Blue",
      description: "Onek valo",
      price: 0,
      galleryImages: null, // default for file input
      categoryId: "689ae96486a04e273039ab3e",
      sizesAvailable: [
        {
          size: "Default",
          stock: 0,
        },
      ],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    galleryFiles.forEach((file) => {
      formData.append("file", file);
    });

    // Add the rest of the data as JSON string
    const { galleryImages, ...rest } = data;

    formData.append("data", JSON.stringify(rest));

    try {
      const res = await createNewProduct(formData).unwrap();
      toast.success("Product Added Succesfully");
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
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
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
                      value={galleryFiles}
                      onChange={setGalleryFiles}
                    />
                  </FormItem>
                )}
              />
            </div>

            {/* Sizes Form */}
            <div className="flex-1 mt-5 md:mt-0">
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
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default page;
