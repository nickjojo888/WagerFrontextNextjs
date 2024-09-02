"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    const authParam = searchParams.get("auth");
    setIsOpen(authParam === "login" || authParam === "register");
    setAuthType(authParam as "login" | "register" | null);
  }, [searchParams]);

  const closeModal = useCallback(() => {
    const currentPath = window.location.pathname;
    const newUrl = new URL(currentPath, window.location.origin);
    router.replace(newUrl.toString());
  }, [router]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      {authType === "login" ? (
        <LoginModal onClose={closeModal} />
      ) : (
        <RegisterModal onClose={closeModal} />
      )}
    </div>
  );
};

export default AuthModal;
