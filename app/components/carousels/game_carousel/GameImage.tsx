import React from "react";
import Image from "next/image";
import { Game } from "./types";

interface GameImageProps {
  game: Game;
}

const GameImage: React.FC<GameImageProps> = ({ game }) => (
  <div className="flex-shrink-0 snap-start">
    {/* to prevetn disabling of carousel bttons
    alternative would be to set the buttons with onload call of next image */}
    <Image
      key={game.id}
      src={game.imageUrl}
      alt={game.name}
      width={256}
      height={359}
      className="rounded-lg w-full h-auto"
      style={{ border: game.border }}
    />
  </div>
);

export default GameImage;
