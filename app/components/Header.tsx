import React from "react";
import Image from "next/image";
import newWagerLogo from "@/public/logos/new_wager_logo.png";
import { useAuth } from "./authentication/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import AuthModal from "./authentication/AuthModal";
import { useRouter } from "next/router";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
  };

  const openAuthModal = (mode: "login" | "register") => {
    router.push(`/?auth=${mode}`);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-gray-900 py-4 text-white">
        <div className="relative w-36 h-full">
          <Image
            src={newWagerLogo}
            alt="Wager Logo"
            priority
            width={120}
            height={40}
          />
        </div>
        <div className="flex space-x-2">
          {user ? (
            <>
              <span className="mr-2">
                Welcome, {user.displayName || user.email}
              </span>
              <button
                className="bg-gray-800 px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-gray-800 px-4 py-2 rounded"
                onClick={() => openAuthModal("login")}
              >
                Login
              </button>
              <button
                className="bg-primary px-4 py-2 rounded"
                onClick={() => openAuthModal("register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>
      <AuthModal />
    </>
  );
}
