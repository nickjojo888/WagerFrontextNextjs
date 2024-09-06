import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { AuthProvider } from "@/app/components/authentication/AuthContext";
import AuthModal from "./components/authentication/AuthModal";
import ClientLayout from "./components/ClientLayout";

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
          <ClientLayout>
            <div className="flex h-screen">
              <Sidebar />
              {/*would like max to be larger than 7xl, on >= medium screens x padding is more*/}
              <div className="max-w-7xl mx-auto flex-1 flex flex-col px-5 md:px-10 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">{children}</main>
              </div>
            </div>
          </ClientLayout>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
