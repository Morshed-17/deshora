import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PriceSlider } from "./PriceSlider";
import { ICategory } from "@/types/type";

interface FilterSidebarProps {
  categories: ICategory[];
  selectedCategories: string[];
  toggleCategory: (slug: string, checked: boolean) => void;
  stockFilter: string;
  setStockFilter: (v: "in-stock" | "out-of-stock" | "") => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  resetFilters: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  toggleCategory,
  stockFilter,
  setStockFilter,
  priceRange,
  setPriceRange,
  resetFilters,
  
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 border rounded-xs p-4 bg-white">
      <h2 className="font-semibold text-lg my-4 uppercase">Categories</h2>
      <div className="flex flex-col gap-3">
        {categories?.map((cat) => (
          <div key={cat._id} className="flex items-center gap-2">
            <Checkbox
              id={cat.slug}
              checked={selectedCategories.includes(cat.slug)}
              onCheckedChange={(c) => toggleCategory(cat.slug, c === true)}
            />
            <Label htmlFor={cat.slug} className="uppercase text-sm">
              {cat.title}
            </Label>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-lg my-4 uppercase">Availability</h2>
      <div className="flex flex-col gap-3">
        {["in-stock", "out-of-stock"].map((type) => (
          <div key={type} className="flex items-center gap-2">
            <Checkbox
              id={type}
              checked={stockFilter === type}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onCheckedChange={(c) => setStockFilter(c ? (type as any) : "")}
            />
            <Label htmlFor={type} className="text-sm capitalize">
              {type.replace("-", " ")}
            </Label>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex gap-2 mb-4">
          <div>
            <Label>Min</Label>
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            />
          </div>
          <div>
            <Label>Max</Label>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            />
          </div>
        </div>
        <PriceSlider
          min={0}
          max={100000}
          step={500}
          value={priceRange}
          onChange={setPriceRange}
        />
      </div>

      <button
        onClick={resetFilters}
        className="mt-4 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
      >
        Reset Filters
      </button>
    </aside>
  );
}
