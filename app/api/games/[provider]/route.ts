import { NextResponse } from "next/server";
import { Game } from "@/app/components/carousels/game_carousel/types";

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;

  const apiResponse = await fetch("https://api.fiverscan.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method: "game_list",
      agent_code: process.env.FIVERSCAN_AGENT_CODE,
      agent_token: process.env.FIVERSCAN_AGENT_TOKEN,
      provider_code: provider,
    }),
  });

  const data = await apiResponse.json();

  // Transform the API data to match the Game type
  const transformedGames: Game[] = data.games.map((game: any) => ({
    id: game.game_code,
    name: game.game_name,
    imageUrl: game.banner,
    provider: game.provider_name,
    providerCode: provider,
  }));

  return NextResponse.json({ games: transformedGames });
}
