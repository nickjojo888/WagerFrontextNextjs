import React, { useState } from "react";
import { auth } from "@/app/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import FacebookIcon from "@/public/images/auth/facebook-logo.png";
import GoogleIcon from "@/public/images/auth/google-logo.png";
import XIcon from "@/public/images/auth/x-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (
    provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider
  ) => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg relative text-white">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleEmailRegister} className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
        />
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
      <div className="flex justify-center space-x-4 mb-4">
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
        <button
          onClick={() => handleSocialRegister(new TwitterAuthProvider())}
          className="p-2 border rounded bg-gray-800 border-gray-700 hover:border-gray-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <Image src={XIcon} alt="X" width={24} height={24} />
          )}
        </button>
      </div>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/?auth=login")}
          className="text-primary hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default RegisterModal;
