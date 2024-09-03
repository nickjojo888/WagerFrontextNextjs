"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import newWagerLogo from "@/public/logos/new_wager_logo.png";
import AuthButtons from "./authentication/AuthButtons";
import { useAuth } from "./authentication/AuthContext";
import WalletButton from "./WalletButton";
import UserMenu from "./UserMenu";
import BalanceDropdown from "./BalanceDropdown";

export default function Header() {
  const { user } = useAuth();
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({
    symbol: "BTC",
    balance: 1000,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsBalanceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCoinSelect = (coin: { symbol: string; balance: number }) => {
    setSelectedCoin(coin);
    setIsBalanceDropdownOpen(false);
  };

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
      {user && (
        <div className="relative flex items-center space-x-4" ref={dropdownRef}>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition duration-300"
            onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
          >
            {selectedCoin.balance} {selectedCoin.symbol}
          </button>
          {isBalanceDropdownOpen && (
            <BalanceDropdown onSelectCoin={handleCoinSelect} />
          )}
          <WalletButton />
        </div>
      )}

      <div className="flex items-center space-x-4">
        {user ? <UserMenu /> : <AuthButtons />}
      </div>
    </header>
  );
}
