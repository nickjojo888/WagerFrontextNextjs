"use client";
import React from "react";
import Image from "next/image";
import newWagerLogo from "@/public/logos/new_wager_logo.png";
import AuthButtons from "./AuthButtons";
import { useAuth } from "../authentication/AuthContext";
import UserMenu from "./UserMenu";
import WalletInfo from "./WalletInfo";

export default function Header() {
  const { user } = useAuth();

  return (
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
      {user && <WalletInfo />}

      <div className="flex items-center space-x-4">
        {user ? <UserMenu /> : <AuthButtons />}
      </div>
    </header>
  );
}
