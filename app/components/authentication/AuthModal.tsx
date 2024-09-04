"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuth } from "./AuthContext";

const AuthModal: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth(); //if user status still loading don't open modal, and if user present don;t open modal

  useEffect(() => {
    if (!loading && !user) {
      const authParam = searchParams.get("auth");
      setIsOpen(authParam === "login" || authParam === "register");
      setAuthType(authParam as "login" | "register" | null);
    } else if (!loading && user) {
      // If user is logged in, close the modal and remove the auth parameter
      closeModal();
    }
  }, [searchParams, user, loading]);

  const closeModal = useCallback(() => {
    if (!isLoading) {
      const currentPath = window.location.pathname;
      const newUrl = new URL(currentPath, window.location.origin);
      router.replace(newUrl.toString());
    }
  }, [router, isLoading]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      closeModal();
    }
  };

  if (!isOpen || loading || user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      {authType === "login" ? (
        <LoginModal
          onClose={closeModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <RegisterModal
          onClose={closeModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default AuthModal;
