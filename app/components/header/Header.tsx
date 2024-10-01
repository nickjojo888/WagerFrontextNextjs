"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import newWagerLogo from "@/public/logos/new_wager_logo.png";
import newWagerIcon from "@/public/logos/new_wager_icon.png";
import AuthButtons from "./AuthButtons";
import { useAuth } from "../authentication/AuthContext";
import UserMenu from "./UserMenu";
import WalletInfo from "./WalletInfo";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center h-20 w-full bg-gray-900 py-4 text-white">
      <div className="relative h-12 flex-shrink-0">
        <Link href="/">
          <Image
            src={newWagerLogo}
            alt="Wager Logo"
            priority
            width={464}
            height={118}
            className={`h-full w-auto shrink-0 ${
              user ? "hidden sm:block" : ""
            }`}
          />
        </Link>
        {/*always hidden if user not logged in */}
        <Image
          src={newWagerIcon}
          alt="Wager Icon"
          priority
          width={230}
          height={230}
          className={`h-full w-auto shrink-0 ${user ? "sm:hidden" : "hidden"}`}
        />
      </div>
      {user && <WalletInfo />}

      <div className="flex items-center space-x-4">
        {user ? <UserMenu /> : <AuthButtons />}
      </div>
    </header>
  );
}
