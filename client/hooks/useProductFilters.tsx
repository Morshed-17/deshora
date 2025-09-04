// hooks/useProductFilters.ts
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type SortOption = "price" | "-price" | "createdAt" | "-createdAt" | "no-sorting";
export type StockFilter = "in-stock" | "out-of-stock" | "";

export function useProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stockFilter, setStockFilter] = useState<StockFilter>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<SortOption>("no-sorting");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") ?? []
  );
  const searchTerm = searchParams.get("searchTerm") || "";

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    if (sortBy && sortBy !== "no-sorting") params.set("sortBy", sortBy);
    if (priceRange[0] > 0) params.set("min", String(priceRange[0]));
    if (priceRange[1] < 100000) params.set("max", String(priceRange[1]));
    if (stockFilter) params.set("stock", stockFilter);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedCategories, sortBy, priceRange, stockFilter, searchTerm, router]);

  // Restore from URL when page reloads / navigating back
  useEffect(() => {
    setSelectedCategories(searchParams.get("category")?.split(",") ?? []);
    setSortBy((searchParams.get("sortBy") as SortOption) || "no-sorting");
    setPriceRange([
      Number(searchParams.get("min") || 0),
      Number(searchParams.get("max") || 100000),
    ]);
    setStockFilter((searchParams.get("stock") as StockFilter) || "");
  }, [searchParams]);

  const resetFilters = () => {
    setStockFilter("");
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSortBy("no-sorting");
  };

  return {
    stockFilter,
    setStockFilter,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    selectedCategories,
    setSelectedCategories,
    searchTerm,
    resetFilters,
  };
}
