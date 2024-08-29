import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";

const AuthModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { auth } = router.query;
    setIsLogin(auth !== "register");
  }, [router.query]);

  const isOpen =
    router.query.auth === "login" || router.query.auth === "register";

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/"); // Redirect to home page after successful auth
    } catch (error) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleSocialAuth = async (
    provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider
  ) => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to home page after successful auth
    } catch (error) {
      setError("Authentication failed. Please try again.");
    }
  };

  const closeModal = () => {
    router.push("/"); // Remove the auth query parameter
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Sign In" : "Register"}
        </h2>
        <form onSubmit={handleEmailAuth} className="mb-4">
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
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => handleSocialAuth(new GoogleAuthProvider())}
            className="p-2 border rounded"
          >
            <Image src="/google-icon.png" alt="Google" width={24} height={24} />
          </button>
          <button
            onClick={() => handleSocialAuth(new FacebookAuthProvider())}
            className="p-2 border rounded"
          >
            <Image
              src="/facebook-icon.png"
              alt="Facebook"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => handleSocialAuth(new TwitterAuthProvider())}
            className="p-2 border rounded"
          >
            <Image
              src="/twitter-icon.png"
              alt="Twitter"
              width={24}
              height={24}
            />
          </button>
        </div>
        <p className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() =>
              router.push(`/?auth=${isLogin ? "register" : "login"}`)
            }
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
