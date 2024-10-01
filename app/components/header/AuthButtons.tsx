"use client";
import React from "react";
import { useAuth } from "../authentication/AuthContext";
import { auth } from "@/app/firebase/firebaseConfig";
import { useOpenAuthModal } from "@/app/utils/authHelpers";

const AuthButtons = () => {
  const { user } = useAuth();
  const openAuthModal = useOpenAuthModal();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="flex space-x-2">
      {user ? (
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
