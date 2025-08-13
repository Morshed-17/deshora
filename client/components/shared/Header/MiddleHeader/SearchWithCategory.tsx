import { SearchIcon } from "lucide-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/type";

function SearchWithCategory({ data }: { data: ICategory[] }) {
  return (
    <div className="flex items-center gap-[1px] h-10">
      <input
        className="bg-gray-100 w-full px-5 h-full rounded-l-full placeholder:text-sm  text-sm focus:outline-none"
        placeholder="Search"
        type="text"
      />

      <select className="border-none shadow-none bg-gray-100 h-full text-sm rounded-none focus:ring-0 focus:outline-none cursor-pointer appearance-none nav-cat-select max-w-[134px]">
        <option>Categories</option>
        {data?.map((category) => (
          <option value="categoreis" key={category._id}>
            {category.title}
          </option>
        ))}
      </select>

      <button className="bg-gray-100 px-3 h-full rounded-r-full flex items-center justify-center">
        <SearchIcon className="text-muted-foreground" size={18} />
      </button>
    </div>
  );
}

export default SearchWithCategory;
