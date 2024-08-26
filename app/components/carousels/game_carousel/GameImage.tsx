import React from "react";
import Image from "next/image";
import { Game } from "./types";

interface GameImageProps {
  game: Game;
}

const GameImage: React.FC<GameImageProps> = ({ game }) => (
  <div className="flex-shrink-0 snap-start">
    <div className="w-32 h-48">
      <Image
        src={game.imageUrl}
        alt={game.name}
        width={100}
        height={150}
        className="rounded-lg w-full h-auto"
        style={{ border: game.border }}
      />
    </div>
  </div>
);

export default GameImage;
