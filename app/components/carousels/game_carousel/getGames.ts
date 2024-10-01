import { cache } from "react";

export type Game = {
  id: string;
  name: string;
  imageUrl: string;
  border?: string;
};

export const revalidate = 3600; // Revalidate every hour

export const getGames = cache(async (provider: string): Promise<Game[]> => {
  const encodedProvider = encodeURIComponent(provider);
  // Use an environment variable for the base URL
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/games/${encodedProvider}`, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  const data = await response.json();
  return data.games;
});
