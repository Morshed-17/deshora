// hooks/useProductFilters.ts
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type SortOption =
  | "price"
  | "-price"
  | "createdAt"
  | "-createdAt"
  | "no-sorting";
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
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const searchTerm = searchParams.get("searchTerm") || "";

  const prevFiltersRef = useRef({
    stockFilter,
    priceRange,
    sortBy,
    selectedCategories,
  });

  // Reset page when any filter changes
  useEffect(() => {
    const prev = prevFiltersRef.current;
    
    const hasChanged =
      prev.stockFilter !== stockFilter ||
      prev.sortBy !== sortBy ||
      prev.priceRange[0] !== priceRange[0] ||
      prev.priceRange[1] !== priceRange[1] ||
      prev.selectedCategories.join(",") !== selectedCategories.join(",");

    if (hasChanged) {
      setPage(1);
    }

    prevFiltersRef.current = {
      stockFilter,
      priceRange,
      sortBy,
      selectedCategories,
    };
  }, [stockFilter, priceRange, sortBy, selectedCategories]);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (selectedCategories.length > 0)
      params.set("category", selectedCategories.join(","));
    if (sortBy && sortBy !== "no-sorting") params.set("sortBy", sortBy);
    if (priceRange[0] > 0) params.set("min", String(priceRange[0]));
    if (priceRange[1] < 100000) params.set("max", String(priceRange[1]));
    if (stockFilter) params.set("stock", stockFilter);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    selectedCategories,
    sortBy,
    priceRange,
    stockFilter,
    searchTerm,
    router,
    page,
    limit,
  ]);

  // Restore from URL when page reloads / navigating back
  useEffect(() => {
    setSelectedCategories(searchParams.get("category")?.split(",") ?? []);
    setSortBy((searchParams.get("sortBy") as SortOption) || "no-sorting");
    setPriceRange([
      Number(searchParams.get("min") || 0),
      Number(searchParams.get("max") || 100000),
    ]);
    setStockFilter((searchParams.get("stock") as StockFilter) || "");
    setPage(Number(searchParams.get("page")));
    setLimit(Number(searchParams.get("limit")));
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
