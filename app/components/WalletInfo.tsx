import React, { useState } from "react";
// /images/games/wager/blackjack.jpg
const coins = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: 1000,
    icon: "/images/currencies/bitcoin.png",
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    balance: 100,
    icon: "/images/currencies/bnb.png",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    balance: 100000,
    icon: "/images/currencies/dodgecoin.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: 5000,
    icon: "/images/currencies/etherum.png",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    balance: 2000,
    icon: "/images/currencies/ltc.png",
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    balance: 5000,
    icon: "/images/currencies/matic.png",
  },
  {
    symbol: "TCOIN",
    name: "TCoin",
    balance: 500,
    icon: "/images/currencies/tcoin.png",
  },
  {
    symbol: "TRX",
    name: "TRON",
    balance: 20000,
    icon: "/images/currencies/trx.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: 10000,
    icon: "/images/currencies/usdc.png",
  },
  {
    symbol: "XRP",
    name: "Ripple",
    balance: 10000,
    icon: "/images/currencies/xrp.png",
  },
];

interface BalanceDropdownProps {
  onSelectCoin: (coin: { symbol: string; balance: number }) => void;
}

const BalanceDropdown: React.FC<BalanceDropdownProps> = ({ onSelectCoin }) => {
  const [showFiat, setShowFiat] = useState(false);

  return (
    <div className="absolute top-full -left-10 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-10">
      <ul className="py-2 max-h-60 overflow-y-auto">
        {coins.map((coin) => (
          <li
            key={coin.symbol}
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelectCoin(coin)}
          >
            <img src={coin.icon} alt={coin.name} className="w-6 h-6 mr-2" />
            <span className="font-medium">{coin.symbol}</span>
            <span className="ml-2 text-gray-400">{coin.name}</span>
            <span className="ml-auto">
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
