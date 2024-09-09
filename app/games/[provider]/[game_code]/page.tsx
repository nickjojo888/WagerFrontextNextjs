import React from "react";
import GameIframe from "@/app/components/play_game/GameIframe";
import GameDescription from "@/app/components/play_game/GameDescription";
import GamesCarousel from "@/app/components/carousels/game_carousel/GamesCarousel";
import ProviderCarousel from "@/app/components/carousels/provider_carousel/ProviderCarousel";
import { PokerChipSVG } from "@/public/svgs/SVGComponents";

interface GamePageProps {
  params: {
    provider: string;
    game_code: string;
  };
}

const GamePage: React.FC<GamePageProps> = ({ params }) => {
  const { provider, game_code } = params;

  return (
    <div className="flex flex-col gap-6 h-full min-h-full overflow-visible px-5 md:px-10">
      <GameIframe provider={provider} game_code={game_code} />
      <GameDescription provider={provider} game_code={game_code} />
      <GamesCarousel
        provider={provider}
        title="More From This Provider"
        Icon={<PokerChipSVG width={24} height={24} />}
      />
      <ProviderCarousel />
      {/* empty space added to bottom, will be replayed in top level layout with footer */}
      <div className="h-10 flex-shrink-0"></div>
    </div>
  );
};

export default GamePage;
