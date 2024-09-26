"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/app/components/authentication/AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MissingDetailsModal: React.FC = () => {
  const { user, authUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(false);
    console.log("user logegr: ", authUser);
    if (!authUser) {
      // If authUser is not present, open the AuthModal
      router.push(`${pathname}/?auth=login`);
    } else {
      // If authUser is present, remove the auth parameter from the URL
      const params = new URLSearchParams(searchParams);
      params.delete("auth");
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}` //add params if present
      );
      // if the user has not filled in all details yet, then show the modal
      if (
        user &&
        (!user.emailVerified || !user.detailsFilled || !user.kycFilled)
      ) {
        setIsOpen(true);
      }
    }
  }, [user, authUser, router, pathname, searchParams]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-4/5 max-h-[90vh] sm:w-1/2 xl:w-1/3 overflow-y-auto py-16 flex flex-col gap-4 px-6 sm:px-14 bg-gray-900 rounded-2xl relative text-white">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          Complete Your Profile
        </h2>
        <p className="text-center mb-4">
          Please complete your profile to continue.
        </p>
        <div className="flex justify-center">
          <Link
            href="/settings/verify"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition duration-300"
          >
            Go to Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissingDetailsModal;
