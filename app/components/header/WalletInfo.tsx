"use client";
import React, { useState, useRef, useEffect } from "react";
import WalletButton from "./WalletButton";
import BalanceDropdown, { CryptoCoin } from "./BalanceDropdown";

const WalletInfo: React.FC = () => {
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin>({
    symbol: "BTC",
    name: "Bitcoin",
    balance: 1000,
    icon: "/images/currencies/bitcoin.png",
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

  const handleCoinSelect = (coin: CryptoCoin) => {
    setSelectedCoin(coin);
    setIsBalanceDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center space-x-2" ref={dropdownRef}>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition duration-300 flex items-center"
        onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
      >
        <img
          src={selectedCoin.icon}
          alt={selectedCoin.name}
          className="w-6 h-6 mr-2"
        />
        <span>{selectedCoin.balance}</span>
      </button>
      {isBalanceDropdownOpen && (
        <BalanceDropdown onSelectCoin={handleCoinSelect} />
      )}
      <WalletButton />
    </div>
  );
};

export default WalletInfo;
