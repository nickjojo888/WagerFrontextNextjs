import React, { useState } from "react";
import { auth } from "@/app/firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FacebookIcon from "@/public/images/auth/facebook-logo.png";
import GoogleIcon from "@/public/images/auth/google-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { useOpenAuthModal } from "@/app/utils/authHelpers";

interface LoginModalProps {
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  isLoading,
  setIsLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { fetchUserByFirebaseUser, isHandlingAuth } = useAuth();
  const openAuthModal = useOpenAuthModal();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    isHandlingAuth.current = true;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      await fetchUserByFirebaseUser(firebaseUser);
    } catch (error) {
      console.log("this is the error: ", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      isHandlingAuth.current = false;
    }
  };

  const handleSocialLogin = async (
    provider: GoogleAuthProvider | FacebookAuthProvider
  ) => {
    setIsLoading(true);
    isHandlingAuth.current = true;
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      await fetchUserByFirebaseUser(firebaseUser);
    } catch (error) {
      console.log("this is the error: ", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      isHandlingAuth.current = false;
    }
  };

  return (
    <div className="w-4/5 max-h-[90vh] sm:w-1/2 xl:w-1/3 overflow-y-auto py-16 flex flex-col gap-4 px-6 sm:px-14 bg-gray-900 rounded-2xl relative text-white">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
          Sign In
        </button>
      </form>
      {error && <p className="text-red-400 text-center">{error}</p>}
      <div className="flex justify-center space-x-8">
        <button
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
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
          onClick={() => handleSocialLogin(new FacebookAuthProvider())}
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
        Don't have an account?{" "}
        <button
          onClick={() => openAuthModal("register")}
          className="text-primary hover:underline"
          disabled={isLoading}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginModal;
