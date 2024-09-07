import React from "react";
import Image from "next/image";
import WalletIcon from "@/public/svgs/wallet-outline.svg";

const WalletButton: React.FC = () => {
  return (
    <button className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded transition duration-300 flex items-center">
      <WalletIcon width={24} height={24} />
      <span className="hidden sm:inline-block ml-2">Wallet</span>
    </button>
  );
};

export default WalletButton;
