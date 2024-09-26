import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/components/authentication/AuthContext";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

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
      // TODO: Implement the actual email verification logic here
      console.log("Sending verification email to:", email);
      setCooldown(60);
      setError("");
    } catch (error) {
      setError("Failed to send verification email. Please try again.");
    }
  };

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
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none disabled:opacity-50"
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
