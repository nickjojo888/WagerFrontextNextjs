import React from "react";
import { getGames } from "../components/carousels/game_carousel/getGames";
import GameDisplay from "../components/game_display/GameDisplay";

export const dynamic = "force-dynamic";

export default async function LiveCasinoPage() {
  const provider = "HABANERO";
  const games = await getGames(provider);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Live Casino</h1>
      <GameDisplay games={games} provider={provider} />
    </div>
  );
}
