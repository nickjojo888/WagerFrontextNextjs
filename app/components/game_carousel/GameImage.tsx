import React from "react";
import Image from "next/image";
import { Game } from "./types";

interface GameImageProps {
  game: Game;
}

const GameImage: React.FC<GameImageProps> = ({ game }) => (
  <div className="flex-shrink-0 px-2 snap-start">
    <Image
      src={game.imageUrl}
      alt={game.title}
      width={150}
      height={200}
      className="rounded-lg w-full h-auto"
      style={{ border: game.border }}
    />
    <p className="mt-2 text-center">{game.title}</p>
  </div>
);

export default GameImage;
