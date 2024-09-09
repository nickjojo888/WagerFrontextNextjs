import { useState, useEffect } from "react";
import { Game } from "./types";

export type GameCategory = "all" | "wager" | "slots" | "liveCasino" | "table";

export const useGames = (provider: string, category: GameCategory = "all") => {
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setGamesLoading(true);
      try {
        const response = await fetch(`/api/games/${provider}`);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        console.log(data.games);
        setGames(data.games);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setGamesLoading(false);
      }
    };

    fetchGames();
  }, [provider, category]);

  return { games, gamesLoading, error };
};
