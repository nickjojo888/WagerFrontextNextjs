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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.log("this is the error: ", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: GoogleAuthProvider | FacebookAuthProvider
  ) => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log("this is the error: ", error);
      setError("Login failed. Please try again.");
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
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleEmailLogin} className="mb-4">
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
          Sign In
        </button>
      </form>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="flex justify-center space-x-8 mb-4">
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
          onClick={() => router.push("/?auth=register")}
          className="text-primary hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginModal;
