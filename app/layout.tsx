import { AuthProvider } from "./components/authentication/AuthContext";
import { Inter } from "next/font/google";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 text-white overflow-x-hidden`}
      >
        <AuthProvider>
          <div className="flex h-screen">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content area on the right */}
            <div className="flex-1 flex flex-col mx-20 overflow-hidden">
              {/* Header inside the main content */}
              <Header />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
