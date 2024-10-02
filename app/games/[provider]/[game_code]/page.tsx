import React from "react";
import GameIframe from "@/app/components/play_game/GameIframe";
import GameDescription from "@/app/components/play_game/GameDescription";
import GamesCarousel from "@/app/components/carousels/game_carousel/GamesCarousel";
import WagerGamesCarousel from "@/app/components/carousels/game_carousel/WagerGamesCarousel";
import ProviderCarousel from "@/app/components/carousels/provider_carousel/ProviderCarousel";
import { PokerChipSVG } from "@/public/svgs/SVGComponents";
import MissingDetailsModal from "@/app/components/play_game/MissingDetailsModal";
import { getGames } from "@/app/components/carousels/game_carousel/getGames";

interface GamePageProps {
  params: {
    provider: string;
    game_code: string;
  };
}

// This function generates the static paths at build time
// export async function generateStaticParams() {
//   const providers = ["PRAGMATIC", "REELKINGDOM", "HABANERO", "DREAMTECH"]; // Add all your providers here
//   const paths = [];

//   for (const provider of providers) {
//     const games = await getGames(provider);
//     const providerPaths = games.map((game) => ({
//       provider: provider,
//       game_code: game.id,
//     }));
//     paths.push(...providerPaths);
//   }

//   return paths;
// }

const GamePage = async ({ params }: GamePageProps) => {
  const { provider, game_code } = params;
  const games =
    provider.toLowerCase() !== "wager" ? await getGames(provider) : [];

  return (
    <div className="flex flex-col gap-6 h-full min-h-full overflow-visible px-5 md:px-10">
      <MissingDetailsModal />
      <GameIframe provider={provider} game_code={game_code} />
      <GameDescription provider={provider} game_code={game_code} />
      {provider.toLowerCase() === "wager" ? (
        <WagerGamesCarousel
          title={`More From ${provider}`}
          Icon={<PokerChipSVG width={24} height={24} />}
        />
      ) : (
        <GamesCarousel
          provider={provider}
          title={`More From ${provider}`}
          Icon={<PokerChipSVG width={24} height={24} />}
          games={games}
        />
      )}
      <ProviderCarousel />
    </div>
  );
};

export default GamePage;
