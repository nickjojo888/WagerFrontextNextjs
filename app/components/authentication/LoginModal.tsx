import React, { useState } from "react";
import { auth } from "@/app/firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FacebookIcon from "@/public/images/auth/facebook-logo.png";
import GoogleIcon from "@/public/images/auth/google-logo.png";
import XIcon from "@/public/images/auth/x-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleSocialLogin = async (
    provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider
  ) => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      setError("Login failed. Please try again.");
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </button>
      </form>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
          className="p-2 border rounded border-gray-700 hover:border-gray-600 transition duration-300"
        >
          <Image src={GoogleIcon} alt="Google" width={24} height={24} />
        </button>
        <button
          onClick={() => handleSocialLogin(new FacebookAuthProvider())}
          className="p-2 border rounded border-gray-700 hover:border-gray-600 transition duration-300"
        >
          <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
        </button>
        <button
          onClick={() => handleSocialLogin(new TwitterAuthProvider())}
          className="p-2 border rounded border-gray-700 hover:border-gray-600 transition duration-300"
        >
          <Image src={XIcon} alt="X" width={24} height={24} />
        </button>
      </div>
      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          onClick={() => router.push("/?auth=register")}
          className="text-blue-400 hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginModal;
