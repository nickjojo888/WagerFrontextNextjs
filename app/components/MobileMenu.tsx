"use client";
import { useState } from "react";
import MenuIcon from "@/public/svgs/menu-outline.svg";

interface MobileMenuProps {
  toggleSidebar: () => void;
}

export default function MobileMenu({ toggleSidebar }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  return (
    <div className="md:hidden">
      <button onClick={handleToggle} className="text-white p-2">
        <MenuIcon width={24} height={24} />
      </button>
      {/* Add more mobile menu items here if needed */}
    </div>
  );
}
