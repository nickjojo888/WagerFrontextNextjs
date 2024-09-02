import React from "react";
import Image from "next/image";
import newWagerLogo from "@/public/logos/new_wager_logo.png";
import AuthModal from "./authentication/AuthModal";
import AuthButtons from "./authentication/AuthButtons";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center bg-gray-900 py-4 text-white">
        <div className="relative w-36 h-full">
          <Image
            src={newWagerLogo}
            alt="Wager Logo"
            priority
            width={120}
            height={40}
          />
        </div>
        <AuthButtons />
      </header>
      <AuthModal />
    </>
  );
}
