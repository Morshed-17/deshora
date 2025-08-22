"use client";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

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
import { useRouter } from "next/navigation";

function SearchWithCategory({ data }: { data: ICategory[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    router.push(`/shop?searchTerm=${searchTerm}&category=${selectedCategory}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    console.log("Selected:", e.target.value);
  };
  return (
    <div className="flex items-center gap-[1px] h-10">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-100 w-full px-5 h-full rounded-l-full placeholder:text-sm  text-sm focus:outline-none"
        placeholder="Search"
        type="text"
      />

      <select
        value={selectedCategory}
        onChange={handleChange}
        className="border-none shadow-none bg-gray-100 h-full text-sm rounded-none focus:ring-0 focus:outline-none cursor-pointer appearance-none nav-cat-select max-w-[134px]"
      >
        <option>Categories</option>
        {data?.map((category) => (
          <option
            value={category.slug}
            key={category._id}
            className="uppercase"
          >
            {category.title}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="bg-gray-100 px-3 h-full rounded-r-full flex items-center justify-center"
      >
        <SearchIcon className="text-muted-foreground" size={18} />
      </button>
    </div>
  );
}

export default SearchWithCategory;
