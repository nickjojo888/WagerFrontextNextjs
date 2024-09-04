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
  console.log("this is the user", user);

  return (
    <header className="flex justify-between items-center h-20 bg-gray-900 py-4 text-white">
      <div className="relative h-12">
        <Image
          src={newWagerLogo}
          alt="Wager Logo"
          priority
          width={464}
          height={118}
          className="h-full w-auto shrink-0"
        />
      </div>
      {user && <WalletInfo />}

      <div className="flex items-center space-x-4">
        {user ? <UserMenu /> : <AuthButtons />}
      </div>
    </header>
  );
}
