"use client";
import React, { useRef, useState, useEffect } from "react";
import GameImage from "./GameImage";
import CarouselButton from "../CarouselButton";
import { useGames, GameCategory } from "./useGames";
import Image from "next/image";

interface GamesCarouselProps {
  category?: GameCategory;
  title: string;
  Icon: React.ReactNode;
}

const GamesCarousel: React.FC<GamesCarouselProps> = ({
  category = "all",
  title,
  Icon,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const games = useGames(category);

  const updateButtonStates = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      setIsAtStart(container.scrollLeft <= 1); // Use a small threshold to account for precision issues
      setIsAtEnd(
        Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth - 1
      );
    }
  };

  useEffect(() => {
    updateButtonStates();
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", updateButtonStates);
      return () => container.removeEventListener("scroll", updateButtonStates);
    }
  }, [games]); // Add games as a dependency to re-run effect when games change

  const scrollGames = (direction: "next" | "prev") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const gameWidth = container.children[0].clientWidth;
      const visibleWidth = container.clientWidth;
      const gamesPerView = Math.floor(visibleWidth / gameWidth);
      const scrollAmount = gameWidth * gamesPerView;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let nextScrollPosition;
      if (direction === "next") {
        nextScrollPosition = Math.min(
          container.scrollLeft + scrollAmount,
          maxScroll
        );
      } else {
        nextScrollPosition = Math.max(container.scrollLeft - scrollAmount, 0);
      }

      container.scrollTo({ left: nextScrollPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center h-12 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">{Icon}</div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex self-stretch gap-4">
          <button className="bg-gray-800 text-white px-4 rounded-2xl hover:bg-gray-700">
            View All
          </button>
          <div className="flex gap-2">
            <CarouselButton
              direction="prev"
              onClick={() => scrollGames("prev")}
              disabled={isAtStart}
            />
            <CarouselButton
              direction="next"
              onClick={() => scrollGames("next")}
              disabled={isAtEnd}
            />
          </div>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll snap-x snap-mandatory h-48 w-full"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {games.map((game) => (
          <Image
            key={game.id}
            src={game.imageUrl}
            alt={game.name}
            width={256}
            height={359}
            className="rounded-lg w-full h-auto snap-start"
            style={{ border: game.border }}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesCarousel;
