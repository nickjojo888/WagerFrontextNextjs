"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/components/authentication/AuthContext";
import { sendEmailVerification, applyActionCode } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useSearchParams, useRouter } from "next/navigation";

// This modal is designed to be opened only when:
// 1. A user exists (is logged in)
// 2. The user's email is not yet verified
// The parent component (likely VerifyPage) should handle this logic and only render
// or open this modal under these conditions.

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsEmailVerifying: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  setIsEmailVerifying,
}) => {
  const { authUser, user, updateUser } = useAuth();
  // If this modal is opened, we can assume user exists and email is not verified
  const [email, setEmail] = useState(user?.email || "");
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleEmailVerification = async () => {
      const mode = searchParams.get("mode");
      const oobCode = searchParams.get("oobCode");
      if (mode === "verifyEmail" && oobCode && user) {
        setIsEmailVerifying(true);
        try {
          await applyActionCode(auth, oobCode);
          await updateUser({ emailVerified: true });
        } catch (error) {
          console.error("Error verifying email:", error);
          setError("Failed to verify email. Please try again.");
        } finally {
          setIsEmailVerifying(false);
          // Remove mode and oobCode from URL
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("mode");
          newSearchParams.delete("oobCode");
          newSearchParams.delete("apiKey");
          const newPathname =
            window.location.pathname +
            (newSearchParams.toString()
              ? `?${newSearchParams.toString()}`
              : "");
          router.replace(newPathname);
        }
      }
    };
    handleEmailVerification();
  }, [searchParams, updateUser, router, user, setIsEmailVerifying]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  // Manage cooldown timer for resending verification email
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendVerification = async () => {
    if (cooldown > 0) {
      setError("Please wait before sending another verification email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // This should only be called if user exists, as per the modal's intended usage
      await sendEmailVerification(authUser!);
      setCooldown(60);
      setError("");
    } catch (error) {
      setError("Failed to send verification email. Please try again.");
      console.error("Error sending verification email:", error);
    }
  };

  // Modal is not rendered if it's not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-4/5 max-h-[90vh] sm:w-1/2 xl:w-1/3 overflow-y-auto py-16 flex flex-col gap-4 px-6 sm:px-14 bg-gray-900 rounded-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          Email Verification
        </h2>
        <p className="text-center mb-4">
          Verify your email address to secure your account
        </p>
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!user?.email}
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none disabled:opacity-75"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleSendVerification}
            type="button"
            disabled={cooldown > 0}
            className={`w-full text-white p-2 rounded transition duration-300 mt-4 ${
              cooldown > 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-secondary"
            }`}
          >
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Send Verification Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
