import React, { useState } from "react";
import { auth } from "@/app/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import FacebookIcon from "@/public/images/auth/facebook-logo.png";
import GoogleIcon from "@/public/images/auth/google-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link"; // Add this import

interface RegisterModalProps {
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  isLoading,
  setIsLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setTermsError("");
    setError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!agreeTerms) {
      setTermsError("Please agree to the Terms and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.log("this is the error: ", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (
    provider: GoogleAuthProvider | FacebookAuthProvider
  ) => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log("this is the error: ", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/3 bg-gray-900 p-8 rounded-lg relative text-white">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleEmailRegister} className="mb-4">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
          />
          {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
          />
          {passwordError && (
            <p className="text-red-400 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              if (e.target.checked) setTermsError(""); // Clear error when checkbox is checked
            }}
            className="mr-2"
          />
          <label htmlFor="agreeTerms" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {termsError && (
          <p className="text-red-400 text-sm mb-2">{termsError}</p>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
          Register
        </button>
      </form>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="flex justify-center space-x-8 mb-4">
        <button
          onClick={() => handleSocialRegister(new GoogleAuthProvider())}
          className="p-2 border rounded bg-gray-800 border-gray-700 hover:border-gray-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <Image src={GoogleIcon} alt="Google" width={24} height={24} />
          )}
        </button>
        <button
          onClick={() => handleSocialRegister(new FacebookAuthProvider())}
          className="p-2 border rounded bg-gray-800 border-gray-700 hover:border-gray-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
          )}
        </button>
      </div>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/?auth=login")}
          className="text-primary hover:underline"
          disabled={isLoading}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default RegisterModal;
