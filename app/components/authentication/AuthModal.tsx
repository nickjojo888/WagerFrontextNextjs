"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth");

  const isOpen = authParam === "login" || authParam === "register";

  if (!isOpen) return null;

  const closeModal = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {authParam === "login" ? <LoginModal /> : <RegisterModal />}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-xl"
      >
        &times;
      </button>
    </div>
  );
};

export default AuthModal;
