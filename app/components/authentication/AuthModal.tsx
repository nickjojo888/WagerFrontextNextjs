"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SetUsernameModal from "./SetUsernameModal";
import { useAuth } from "./AuthContext";

const AuthModal: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register" | null>(null);
  const [isLoading, setIsLoading] = useState(false); //this manages whether the auth modal itself if loading
  const { user, authUser, loading } = useAuth(); //if user status still loading don't open modal, and if user present don;t open modal
  const [isSetUsernameOpen, setIsSetUsernameOpen] = useState(false);

  useEffect(() => {
    setIsAuthOpen(false);
    setIsSetUsernameOpen(false);
    if (!loading) {
      if (!authUser) {
        const authParam = searchParams.get("auth");
        setIsAuthOpen(authParam === "login" || authParam === "register");
        setAuthType(authParam as "login" | "register" | null);
      } else if (!user) {
        // if auth user found, but no backend user, we need to create one
        setIsSetUsernameOpen(true);
      }
    }
  }, [searchParams, authUser, user, loading, router]);

  const closeAuthModal = useCallback(() => {
    if (!isLoading) {
      const currentPath = window.location.pathname;
      const newUrl = new URL(currentPath, window.location.origin);
      router.replace(newUrl.toString());
    }
  }, [router, isLoading]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      closeAuthModal();
    }
  };
  //if the user is already logged in, or we are still waiting to tell if this is the case, then don't show anything
  if (!isAuthOpen && !isSetUsernameOpen) return null;

  return (
    <>
      {isSetUsernameOpen ? (
        <SetUsernameModal />
      ) : (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40"
          onClick={handleOutsideClick}
        >
          {authType === "login" ? (
            <LoginModal
              onClose={closeAuthModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <RegisterModal
              onClose={closeAuthModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AuthModal;
