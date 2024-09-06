import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/components/authentication/AuthContext";
import AuthModal from "./components/authentication/AuthModal";
import ClientLayout from "./components/ClientLayout";
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
            <ClientLayout>{children}</ClientLayout>
          </LoadingController>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
