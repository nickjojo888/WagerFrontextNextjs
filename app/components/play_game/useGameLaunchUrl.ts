"use client";
import { useState, useEffect } from "react";

export const useGameLaunchUrl = (provider: string, game_code: string) => {
  const [launchUrl, setLaunchUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunchUrl = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/games/${provider}/${game_code}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch game launch URL");
        }
        setLaunchUrl(data.launch_url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunchUrl();
  }, [provider, game_code]);

  return { launchUrl, loading, error };
};
