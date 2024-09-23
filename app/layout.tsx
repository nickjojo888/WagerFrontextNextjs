import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/components/authentication/AuthContext";
import AuthModal from "./components/authentication/AuthModal";
import SetUsernameModal from "./components/authentication/SetUsernameModal";
import ClientLayout from "./components/ClientLayout";
import LoadingController from "./components/site_loading/LoadingController";
import { Suspense } from "react";
import DemoVerification from "./components/DemoVerification";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-hidden h-full" lang="en">
      <body
        className={`${inter.className} overflow-hidden h-full bg-gray-900 text-white`}
      >
        <AuthProvider>
          <LoadingController>
            <ClientLayout>{children}</ClientLayout>
          </LoadingController>
          <Suspense fallback={<AuthLoadingFallback />}>
            <AuthModal />
          </Suspense>
          <DemoVerification />
        </AuthProvider>
      </body>
    </html>
  );
}

function AuthLoadingFallback() {
  return <div className=""></div>;
}
