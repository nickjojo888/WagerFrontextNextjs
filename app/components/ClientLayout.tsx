"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // on lg devices sidebar open by default, but closed by default on mobile
    const handleResize = () => {
      setIsSidebarExpanded(window.innerWidth >= 1024); // 1024px is the default breakpoint for 'lg' in Tailwind
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex flex-col h-full lg:grid lg:grid-rows-[auto,1fr] lg:grid-cols-[auto,1fr] overflow-y-hidden">
      {/* Header */}
      <div className="lg:col-start-2 w-full max-w-7xl m-auto px-5 md:px-10 overflow-x-visible">
        <Header />
      </div>

      <div
        className={clsx(
          // you need overflow-y to be visible for the tooltips to show outside sidebar, change to hidden and they are clipped. Wierd
          "flex-1 overflow-y-auto lg:overflow-y-visible lg:col-start-1 lg:row-start-1 lg:row-span-2 ",
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
        <main className="h-full max-w-7xl m-auto overflow-y-auto overflow-x-hidden">
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
