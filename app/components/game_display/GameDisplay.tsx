import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../game_search/SearchBar";
import { Game } from "../carousels/game_carousel/getGames";

interface GameDisplayProps {
  games: Game[];
  provider: string;
}

export default function GameDisplay({ games, provider }: GameDisplayProps) {
  return (
    <div>
      <SearchBar />

      <div className="flex flex-wrap gap-4 mt-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${provider}/${game.id}`}
            className="w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/8 flex-shrink-0 transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <Image
              src={game.imageUrl}
              alt={game.name}
              width={200}
              height={200}
              style={{ border: game.border }}
              className="rounded-lg w-full h-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
