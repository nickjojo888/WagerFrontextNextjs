import React from "react";
import IframeMenu from "./iframe_menu/IframeMenu";

interface GameIframeProps {
  provider: string;
  game_code: string;
}

const GameIframe: React.FC<GameIframeProps> = ({ provider, game_code }) => {
  return (
    <div className="h-full flex flex-col flex-shrink-0">
      <iframe
        className="bg-gray-800 w-full h-full border-none"
        title={`${provider} - ${game_code}`}
      />
      <IframeMenu />
    </div>
  );
};

export default GameIframe;
