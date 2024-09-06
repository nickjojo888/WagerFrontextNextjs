"use client";
import { useState } from "react";
import clsx from "clsx";
import Sidebar from "@/app/components/sidebar/Sidebar";
import MobileMenu from "@/app/components/MobileMenu";
import Header from "@/app/components/header/Header";

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row h-screen">
//       <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
//       <div className="max-w-7xl mx-auto flex-1 flex flex-col px-5 md:px-10 overflow-x-auto">
//         <Header />
//         <main className="flex-1 overflow-y-auto overflow-x-hidden">
//           {children}
//         </main>
//       </div>
//       <MobileMenu toggleSidebar={toggleSidebar} />
//     </div>
//   );
// }

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
    <div className="grid grid-rows-[auto,1fr,auto] grid-cols-1 lg:grid-cols-[auto,1fr] lg:grid-rows-[auto,1fr] h-screen relative">
      {/* Sidebar */}
      <div className="row-start-5 row-span-1 lg:col-start-1 lg:row-span-2 lg:relative z-10">
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        {/* On smaller screens, the overlay is shown when the sidebar is expanded */}
      </div>

      {/* Header */}
      <div className="row-start-1 row-span-1 lg:col-start-2 lg:col-span-1 px-5 md:px-10">
        <Header />
      </div>

      {/* Main Content */}
      <div className="row-start-2 lg:col-start-2 lg:row-start-2 px-5 md:px-10 overflow-y-auto">
        <main className="h-full">{children}</main>
      </div>
      <div className="row-start-3">
        <MobileMenu toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
