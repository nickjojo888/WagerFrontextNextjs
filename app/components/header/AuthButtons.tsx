"use client";
import React from "react";
import { useAuth } from "../authentication/AuthContext";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
  };

  const openAuthModal = (mode: "login" | "register") => {
    router.push(`/?auth=${mode}`);
  };

  return (
    <div className="flex space-x-2">
      {authUser ? (
        <>
          <button
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
            onClick={() => openAuthModal("login")}
          >
            Login
          </button>
          <button
            className="bg-primary hover:bg-secondary px-4 py-2 rounded"
            onClick={() => openAuthModal("register")}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
