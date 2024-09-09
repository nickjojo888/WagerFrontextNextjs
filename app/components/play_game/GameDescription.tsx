"use client";
import React, { useState } from "react";
import ChevronDownIcon from "@/public/svgs/chevron-down-outline.svg";
import ChevronUpIcon from "@/public/svgs/chevron-up-outline.svg";

interface GameDescriptionProps {
  provider: string;
  game_code: string;
}

const GameDescription: React.FC<GameDescriptionProps> = ({
  provider,
  game_code,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: Fetch actual game description based on provider and game_code
  const gameDescription =
    "This is a placeholder for the game description. Replace this with the actual game description fetched from your data source.";

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Game Description</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-2xl focus:outline-none"
          aria-label={
            isExpanded ? "Collapse description" : "Expand description"
          }
        >
          {isExpanded ? (
            <ChevronUpIcon width={20} height={20} />
          ) : (
            <ChevronDownIcon width={20} height={20} />
          )}
        </button>
      </div>
      {isExpanded && <p className="mt-2">{gameDescription}</p>}
    </div>
  );
};

export default GameDescription;
