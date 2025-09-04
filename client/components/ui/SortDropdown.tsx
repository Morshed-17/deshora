import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/hooks/useProductFilters";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (v: SortOption) => void;
}

export function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="price">Price Low To High</SelectItem>
          <SelectItem value="-price">Price High To Low</SelectItem>
          <SelectItem value="-createdAt">Newest</SelectItem>
          <SelectItem value="createdAt">Oldest</SelectItem>
          <SelectItem value="no-sorting">
            No Sorting
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
