"use client";
import SearchIcon from "@/public/svgs/search-outline.svg";

// component defines it's own height using intrinsic height + padding, width depends on parent
export default function SearchBar() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="search"
        className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:outline-none"
        placeholder="Search..."
      />
    </div>
  );
}
