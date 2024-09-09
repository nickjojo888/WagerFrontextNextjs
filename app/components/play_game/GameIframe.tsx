"use client";
import React from "react";
import IframeMenu from "./iframe_menu/IframeMenu";
import { useGameLaunchUrl } from "./useGameLaunchUrl";

interface GameIframeProps {
  provider: string;
  game_code: string;
}

const GameIframe: React.FC<GameIframeProps> = ({ provider, game_code }) => {
  const { launchUrl, loading, error } = useGameLaunchUrl(provider, game_code);

  return (
    <div className="h-full flex flex-col flex-shrink-0">
      <div className="bg-gray-800 w-full h-full flex items-center justify-center">
        {loading ? (
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
