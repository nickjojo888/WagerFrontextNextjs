"use client";
import { useState } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import MobileMenu from "@/app/components/MobileMenu";

export default function SidebarController({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      {children}
      <MobileMenu toggleSidebar={toggleSidebar} />
    </div>
  );
}
