import React from "react";
import GameIframe from "@/app/components/play_game/GameIframe";
import GameDescription from "@/app/components/play_game/GameDescription";
import GamesCarousel from "@/app/components/carousels/game_carousel/GamesCarousel";
import ProviderCarousel from "@/app/components/carousels/provider_carousel/ProviderCarousel";
import { PokerChipSVG } from "@/public/svgs/SVGComponents";
import MissingDetailsModal from "@/app/components/play_game/MissingDetailsModal";

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
      <MissingDetailsModal />
      <GameIframe provider={provider} game_code={game_code} />
      <GameDescription provider={provider} game_code={game_code} />
      <GamesCarousel
        provider={provider}
        title={`More From ${provider}`}
        Icon={<PokerChipSVG width={24} height={24} />}
      />
      <ProviderCarousel />
    </div>
  );
};

export default GamePage;
