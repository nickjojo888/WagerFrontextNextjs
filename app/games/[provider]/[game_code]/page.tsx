import React from "react";
import { FaHome, FaInfoCircle, FaCog } from "react-icons/fa";
import Image from "next/image";

interface GamePageProps {
  params: {
    provider: string;
    game_code: string;
  };
}

const GamePage: React.FC<GamePageProps> = ({ params }) => {
  const { provider, game_code } = params;

  return (
    <div className="flex flex-col h-full min-h-full">
      {/* iframe container */}
      <div className="h-5/6">
        <iframe
          className="bg-gray-800 w-full h-full border-none"
          title={`${provider} - ${game_code}`}
        />
      </div>
      {/* Updated menu div */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center h-16">
        {/* Left icons with tooltips */}
        <div className="flex space-x-4">
          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded">
              <FaHome size={24} />
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Home
            </span>
          </div>
          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded">
              <FaInfoCircle size={24} />
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Info
            </span>
          </div>
          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded">
              <FaCog size={24} />
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Settings
            </span>
          </div>
        </div>

        {/* Center logo */}
        <div className="flex-grow flex justify-center">
          <Image src="/logo.png" alt="Logo" width={100} height={40} />
        </div>

        {/* Right menu toggle */}
        <div className="flex items-center space-x-2">
          <span>Real</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span>Fun</span>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
