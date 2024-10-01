"use client";
import React from "react";
import Image from "next/image";
import IframeMenu from "./iframe_menu/IframeMenu";
import { useGameLaunchUrl } from "./useGameLaunchUrl";
import newWagerLogo from "@/public/logos/new_wager_logo.png";

interface GameIframeProps {
  provider: string;
  game_code: string;
}

const GameIframe: React.FC<GameIframeProps> = ({ provider, game_code }) => {
  const { launchUrl, loading, error } = useGameLaunchUrl(provider, game_code);

  return (
    <div className="h-full flex flex-col flex-shrink-0">
      <div className="bg-gray-800 w-full h-full flex items-center justify-center">
        {provider === "Wager" ? (
          <div className="text-center">
            <Image
              src={newWagerLogo}
              alt="Wager Logo"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p>This game is currently in development. Stay tuned!</p>
          </div>
        ) : loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : launchUrl ? (
          <iframe
            src={launchUrl}
            className="w-full h-full border-none"
            title={`${provider} - ${game_code}`}
          />
        ) : (
          <div>No launch URL available</div>
        )}
      </div>
      <IframeMenu />
    </div>
  );
};

export default GameIframe;
