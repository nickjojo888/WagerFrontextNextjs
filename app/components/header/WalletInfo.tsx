"use client";
import React, { useState, useRef, useEffect } from "react";
import WalletButton from "./WalletButton";
import BalanceDropdown from "../BalanceDropdown";

const WalletInfo: React.FC = () => {
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
  );
};

export default WalletInfo;
