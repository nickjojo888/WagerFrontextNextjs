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

const LoginModal: React.FC = () => {
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
    <div className="bg-white p-8 rounded-lg w-96 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleEmailLogin} className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </form>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
          className="p-2 border rounded"
        >
          <Image src={GoogleIcon} alt="Google" width={24} height={24} />
        </button>
        <button
          onClick={() => handleSocialLogin(new FacebookAuthProvider())}
          className="p-2 border rounded"
        >
          <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
        </button>
        <button
          onClick={() => handleSocialLogin(new TwitterAuthProvider())}
          className="p-2 border rounded"
        >
          <Image src={XIcon} alt="X" width={24} height={24} />
        </button>
      </div>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button
          onClick={() => router.push("/?auth=register")}
          className="text-blue-500 hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginModal;
