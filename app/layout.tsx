import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { AuthProvider } from "@/app/components/authentication/AuthContext";
import AuthModal from "./components/authentication/AuthModal";
import SidebarController from "./components/SidebarController";
import LoadingController from "./components/LoadingController";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 text-white overflow-x-hidden`}
      >
        <AuthProvider>
          <LoadingController>
            <SidebarController>
              {/*would like max to be larger than 7xl, on >= medium screens x padding is more*/}
              <div className="max-w-7xl mx-auto flex-1 flex flex-col px-5 md:px-10 overflow-x-auto">
                <Header />
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                  {children}
                </main>
              </div>
            </SidebarController>
          </LoadingController>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
