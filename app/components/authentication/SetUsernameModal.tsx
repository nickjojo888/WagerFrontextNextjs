"use client";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Added for navigation after username set
import Link from "next/link"; // Add this import

const SetUsernameModal: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { updateUser, user } = useAuth(); // Add user to the destructured values
  const router = useRouter(); // Added for navigation after username set

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!user?.agreedToTerms && !agreeTerms) {
      setError("Please agree to the Terms and Privacy Policy.");
      setIsLoading(false);
      return;
    }

    try {
      // Update user with username and agreedToTerms if necessary
      await updateUser({
        username,
        ...(user?.agreedToTerms ? {} : { agreedToTerms: true }),
      });
      // Redirect to home page or dashboard after successful username set
      router.push("/");
    } catch (error) {
      console.error("Error setting username:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40">
      <div className="w-4/5 max-h-[90vh] sm:w-1/2 xl:w-1/3 overflow-y-auto py-16 flex flex-col gap-4 px-6 sm:px-14 bg-gray-900 rounded-2xl relative text-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          Set Your Username
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
            disabled={isLoading}
            required
          />
          {!user?.agreedToTerms && (
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (e.target.checked) setError("");
                  }}
                  className="mr-2"
                />
                <label htmlFor="agreeTerms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
          )}
          {error && <p className="text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Set Username"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUsernameModal;
