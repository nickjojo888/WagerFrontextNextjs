import React, { useState } from "react";

const coins = [
  { symbol: "BTC", name: "Bitcoin", balance: 1000 },
  { symbol: "ETH", name: "Ethereum", balance: 5000 },
  { symbol: "USDT", name: "Tether", balance: 10000 },
];

interface BalanceDropdownProps {
  onSelectCoin: (coin: { symbol: string; balance: number }) => void;
}

const BalanceDropdown: React.FC<BalanceDropdownProps> = ({ onSelectCoin }) => {
  const [showFiat, setShowFiat] = useState(false);

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-10">
      <ul className="py-2">
        {coins.map((coin) => (
          <li
            key={coin.symbol}
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectCoin(coin)}
          >
            <span className="font-medium">{coin.symbol}</span>
            <span className="ml-2 text-gray-400">{coin.name}</span>
            <span className="float-right">
              {showFiat ? `$${(coin.balance * 100).toFixed(2)}` : coin.balance}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-700 px-4 py-2 flex items-center justify-between">
        <span>Show in fiat</span>
        <button
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
            showFiat ? "bg-green-500" : "bg-gray-600"
          }`}
          onClick={() => setShowFiat(!showFiat)}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
              showFiat ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default BalanceDropdown;
