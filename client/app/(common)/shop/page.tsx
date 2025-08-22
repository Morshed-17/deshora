"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/common/Product/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory, IProduct } from "@/types/type";
import NoProductFound from "./_component/NoProductFound";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import { PriceSlider } from "./_component/PriceSlider";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Initial categories from URL ---
  const initialCategories = searchParams.get("category")
    ? searchParams.get("category")!.split(",")
    : [];

  const searchTerm = searchParams.get("searchTerm");
  useEffect(() => {
    const urlCategories = searchParams.get("category")?.split(",") ?? [];
    // Only update if URL is different from current state
    if (urlCategories.join(",") !== selectedCategories.join(",")) {
      setSelectedCategories(urlCategories);
    }
  }, [searchParams]);

  const [sortBy, setSortBy] = useState<null | string>("no-sorting");

  const { data } = useGetAllCategoriesQuery(undefined);
  const categories: ICategory[] = data?.data;

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);

  // --- Sync checkbox state to URL ---
  useEffect(() => {
    const params = new URLSearchParams({
      searchTerm: searchTerm || "",
      category: selectedCategories.join(","),
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedCategories, searchTerm]);

  // --- Toggle category selection ---
  const toggle = (slug: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, slug] : prev.filter((s) => s !== slug)
    );
  };

  // --- Reset Filters ---
  const resetFilters = () => setSelectedCategories([]);

  // --- Convert slugs to IDs for API query ---
  const selectedCategoryIds = selectedCategories
    .map((slug) => categories?.find((cat) => cat.slug === slug)?._id)
    .filter((id): id is string => !!id);

  const queryObject: {
    categoryIds?: string[];
    sortBy?: string;
    min?: number;
    max?: number;
    searchTerm?: string;
  } = {};

  if (selectedCategoryIds.length > 0)
    queryObject.categoryIds = selectedCategoryIds;
  if (sortBy) queryObject.sortBy = sortBy;

  if (searchTerm) queryObject.searchTerm = searchTerm;

  queryObject.min = priceRange[0];
  queryObject.max = priceRange[1];

  const formattedQuery = Object.fromEntries(
    Object.entries(queryObject).map(([key, value]) =>
      Array.isArray(value) ? [key, value.join(",")] : [key, String(value)]
    )
  );

  const params = new URLSearchParams(formattedQuery);
  const { data: productsData } = useGetAllProductsQuery(params.toString());
  const products = productsData?.data?.products;

  return (
    <div className="px-4 md:px-8 lg:px-12 min-h-screen">
      <div className="flex justify-between py-4">
        <div className=" flex gap-3 items-center">
          <h1 className="text-2xl border-b border-foreground font-medium uppercase">
            Shop
          </h1>
          <ChevronRight />
          {selectedCategories?.map((category, index) => (
            <h3
              className="text-2xl font-normal uppercase border-b border-accent-foreground"
              key={index}
            >
              {category}
            </h3>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <p>Sort By</p>
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="price">Price Low To High</SelectItem>
                <SelectItem value="-price">Price High To Low</SelectItem>
                <SelectItem value="-createdAt">Newest</SelectItem>
                <SelectItem value="createdAt">Oldest</SelectItem>
                <SelectItem value="no-sorting" className="text-primary/60">
                  Clear Sorting
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5 border rounded-xs p-4 bg-white  h-full">
          <h2 className="font-semibold text-lg my-4 uppercase">Categories</h2>
          <div className="flex flex-col gap-3">
            {categories?.map((cat) => (
              <div key={cat._id} className="flex items-center gap-2">
                <Checkbox
                  id={cat.slug}
                  value={cat.slug}
                  checked={selectedCategories.includes(cat.slug)}
                  onCheckedChange={(c) => toggle(cat.slug, c === true)}
                />
                <Label className="uppercase text-sm" htmlFor={cat.slug}>
                  {cat.title}
                </Label>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <PriceSlider
              min={0}
              max={100000}
              step={500}
              value={priceRange}
              onChange={(val) => setPriceRange(val)}
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="mt-4 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Reset Filters
          </button>
        </aside>

        {/* Products */}
        <main className="flex-1">
          {products?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: IProduct) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="p-10 flex justify-center">
              <NoProductFound />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
