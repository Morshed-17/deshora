"use client";

import { ChevronRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory, IProduct } from "@/types/type";

import { useProductFilters } from "@/hooks/useProductFilters";
import { FilterSidebar } from "./_component/FilterSidebar";
import ProductCard from "@/components/common/Product/ProductCard";
import NoProductFound from "./_component/NoProductFound";
import { SortDropdown } from "@/components/ui/SortDropdown";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "@/components/ui/PaginationControls";

export default function ProductsPage() {
  const { page, setPage, limit } = usePagination(8);

  const {
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
  } = useProductFilters();

  // --- Fetch categories ---
  const { data } = useGetAllCategoriesQuery(undefined);
  const categories: ICategory[] = data?.data || [];

  // --- Convert slugs to IDs for API ---
  const selectedCategoryIds = selectedCategories
    .map((slug) => categories?.find((cat) => cat.slug === slug)?._id)
    .filter((id): id is string => !!id);

  // --- Build API query object ---
  const queryObject: {
    categoryIds?: string[];
    sortBy?: string;
    min?: number;
    max?: number;
    searchTerm?: string;
    stock?: string;
    page?: number;
    limit?: number;
  } = {
    page,
    limit
  };

  if (selectedCategoryIds.length > 0)
    queryObject.categoryIds = selectedCategoryIds;
  if (sortBy && sortBy !== "no-sorting") queryObject.sortBy = sortBy;
  if (searchTerm) queryObject.searchTerm = searchTerm;
  if (stockFilter) queryObject.stock = stockFilter;

  queryObject.min = priceRange[0];
  queryObject.max = priceRange[1];
  queryObject.page = page;
  queryObject.limit = limit;

  // Format query for API
  const formattedQuery = Object.fromEntries(
    Object.entries(queryObject).map(([key, value]) =>
      Array.isArray(value) ? [key, value.join(",")] : [key, String(value)]
    )
  );
  const params = new URLSearchParams(formattedQuery);

  // --- Fetch products ---
  const { data: productsData } = useGetAllProductsQuery(params.toString());
  const products = productsData?.data?.products;

  const meta = productsData?.data.meta;

  return (
    <div className="px-4 md:px-8 lg:px-12 min-h-screen">
      {/* Header */}
      <div className="flex justify-between py-4">
        <div className="flex gap-3 items-center">
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
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <FilterSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={(slug, checked) =>
            setSelectedCategories((prev) =>
              checked ? [...prev, slug] : prev.filter((s) => s !== slug)
            )
          }
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          resetFilters={resetFilters}
        />

        {/* Products Grid */}
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

          <PaginationControls meta={meta} page={page} setPage={setPage} />
        </main>
      </div>
    </div>
  );
}
