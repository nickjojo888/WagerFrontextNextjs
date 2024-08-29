import React from "react";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal: React.FC = () => {
  const router = useRouter();
  const { auth } = router.query;

  const isOpen = auth === "login" || auth === "register";

  if (!isOpen) return null;

  const closeModal = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {auth === "login" ? <LoginModal /> : <RegisterModal />}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-xl"
      >
        &times;
      </button>
    </div>
  );
};

export default AuthModal;
