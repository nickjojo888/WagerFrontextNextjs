import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/components/authentication/AuthContext";
import AuthModal from "./components/authentication/AuthModal";
import ClientLayout from "./components/ClientLayout";
import LoadingController from "./components/site_loading/LoadingController";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-hidden h-full" lang="en">
      <body
        className={`${inter.className} overflow-hidden h-full bg-gray-900 text-white overflow-x-hidden`}
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
