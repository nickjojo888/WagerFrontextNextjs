"use client";
import { useState } from "react";
import clsx from "clsx";
import Sidebar from "@/app/components/sidebar/Sidebar";
import MobileMenu from "@/app/components/MobileMenu";
import Header from "@/app/components/header/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex flex-col h-screen lg:grid lg:grid-rows-[auto,1fr] lg:grid-cols-[auto,1fr] overflow-y-hidden">
      {/* Header */}
      <div className="lg:col-start-2 px-5 md:px-10 overflow-x-visible">
        <Header />
      </div>

      <div
        className={clsx(
          "flex-1 overflow-y-auto lg:col-start-1 lg:row-start-1 lg:row-span-2 ",
          {
            "hidden lg:block": !isSidebarExpanded,
          }
        )}
      >
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content wrapper */}
      <div
        className={clsx(
          "flex-1 overflow-y-hidden lg:col-start-2 lg:row-start-2",
          { "hidden lg:block": isSidebarExpanded }
        )}
      >
        {/* Scrollable main content */}
        <main className="h-full overflow-y-auto overflow-x-hidden px-5 md:px-10">
          {children}
        </main>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileMenu toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
