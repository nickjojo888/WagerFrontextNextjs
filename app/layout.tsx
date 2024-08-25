import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <div className="flex h-screen">
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content area on the right */}
          <div className="flex-1 flex flex-col">
            {/* Header inside the main content */}
            <Header />
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
