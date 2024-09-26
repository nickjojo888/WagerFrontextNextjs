"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsLinkProps {
  label: string;
  path: string;
}

const SettingsLink: React.FC<SettingsLinkProps> = ({ label, path }) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`py-2 px-4 rounded-md text-white hover:bg-gray-700 ${
        pathname === path ? "bg-gray-600 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
};

export default SettingsLink;
