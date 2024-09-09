"use client";
import React, { useState } from "react";
import HappyIcon from "@/public/svgs/happy-outline.svg";
import PlayIcon from "@/public/svgs/play-outline.svg";

const RealPlayToggle: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<"Real" | "Play">("Real");

  return (
    <div className="flex gap-x-2 overflow-x-auto h-12">
      <button
        className={`px-4 rounded-lg text-sm whitespace-nowrap flex items-center ${
          selectedOption === "Real" ? "bg-gray-700" : ""
        }`}
        onClick={() => setSelectedOption("Real")}
      >
        <div className="mr-2">
          <PlayIcon width={20} height={20} />
        </div>
        Real
      </button>
      <button
        className={`px-4 rounded-lg text-sm whitespace-nowrap flex items-center ${
          selectedOption === "Play" ? "bg-gray-700" : ""
        }`}
        onClick={() => setSelectedOption("Play")}
      >
        <div className="mr-2">
          <HappyIcon width={20} height={20} />
        </div>
        Play
      </button>
    </div>
  );
};

export default RealPlayToggle;
