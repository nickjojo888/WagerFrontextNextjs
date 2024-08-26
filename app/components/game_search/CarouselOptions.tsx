"use client";
import { useState } from "react";

import {
  HeadPhonesSVG,
  HandShakeSVG,
  ProvidersSVG,
  GameShowsSVG,
  RouletteSVG,
  CardsSVG,
  PokerChipSVG,
  ControllerSVG,
  FocusSVG,
  SportsSVG,
  DiceSVG,
  BitcoinSVG,
  DollarSVG,
  BetSlipSVG,
} from "@/public/svgs/SVGComponents";
import HomeIcon from "@/public/svgs/home-outline.svg";

import { SVGProps } from "react";

type OptionType = {
  text: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
};

const options: OptionType[] = [
  { text: "Lobby", icon: HomeIcon },
  { text: "Live Casino", icon: HeadPhonesSVG },
  { text: "Slots", icon: PokerChipSVG },
  { text: "Table Games", icon: CardsSVG },
  { text: "Game Shows", icon: GameShowsSVG },
];

// component defines it's own height using h-12, width depends on parent
export default function CarouselOptions() {
  const [selectedOption, setSelectedOption] = useState(options[0].text);

  return (
    <div
      style={{
        scrollSnapType: "x mandatory", // must snap to nearest child when scrolling stops
        overflowX: "scroll",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer and Edge
      }}
      className="flex items-stretch gap-x-2 overflow-x-auto w-full h-12"
    >
      {options.map((option) => (
        <button
          key={option.text}
          className={`px-4 rounded-lg text-sm whitespace-nowrap flex items-center ${
            selectedOption === option.text
              ? "bg-gray-500 text-white"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          onClick={() => setSelectedOption(option.text)}
        >
          <div className="mr-2">
            <option.icon width={20} height={20} />
          </div>
          {option.text}
        </button>
      ))}
    </div>
  );
}
