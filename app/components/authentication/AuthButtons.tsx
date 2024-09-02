"use client";
import React from "react";
import { useAuth } from "./AuthContext";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
  };

  const openAuthModal = (mode: "login" | "register") => {
    router.push(`/?auth=${mode}`);
  };

  return (
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
  );
};

export default AuthButtons;
