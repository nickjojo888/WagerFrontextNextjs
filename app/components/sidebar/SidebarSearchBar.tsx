"use client";
import SearchIcon from "@/public/svgs/search-outline.svg";

interface SearchBarProps {
  isExpanded: boolean;
}

export default function SidebarSearchBar({ isExpanded }: SearchBarProps) {
  return (
    <button className="relative w-full flex items-center p-4 text-sm border rounded-lg bg-gray-800 border-gray-600 text-white focus:outline-none hover:bg-gray-700 transition-colors duration-300">
      <SearchIcon
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
      />
      {isExpanded && <span className="pl-3">Search...</span>}
    </button>
  );
}
