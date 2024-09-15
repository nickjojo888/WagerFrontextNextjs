"use client";
import Link from "next/link";
import MenuIcon from "@/public/svgs/menu-outline.svg";
import ReceiptIcon from "@/public/svgs/receipt-outline.svg";
import StarIcon from "@/public/svgs/star-outline.svg";
import ChatboxIcon from "@/public/svgs/chatbox-outline.svg";

interface MobileMenuProps {
  toggleSidebar: () => void;
}

export default function MobileMenu({ toggleSidebar }: MobileMenuProps) {
  return (
    <nav className="lg:hidden bg-gray-900 border-t border-gray-700 p-2 text-white">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="flex-1 flex flex-col items-center justify-center border-r border-gray-700"
        >
          <MenuIcon className="w-4 h-4" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <Link
          href="/search"
          className="flex-1 flex flex-col items-center justify-center border-r border-gray-700"
        >
          <ReceiptIcon className="w-4 h-4" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          href="/new"
          className="flex-1 flex flex-col items-center justify-center border-r border-gray-700"
        >
          <StarIcon className="w-4 h-4" />
          <span className="text-xs mt-1">New</span>
        </Link>
        <Link
          href="/notifications"
          className="flex-1 flex flex-col items-center justify-center"
        >
          <ChatboxIcon className="w-4 h-4" />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
      </div>
    </nav>
  );
}
