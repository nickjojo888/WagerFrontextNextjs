"use client";
import React, { useRef, useState, useEffect } from "react";
import CarouselButton from "../CarouselButton";
import { useGames } from "./useGames";
import Image from "next/image";
import Link from "next/link";

interface GamesCarouselProps {
  provider: string;
  title: string;
  Icon: React.ReactNode;
}

const GamesCarousel: React.FC<GamesCarouselProps> = ({
  provider,
  title,
  Icon,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { games, gamesLoading, error } = useGames(provider);

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
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center h-12 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">{Icon}</div>
          <h2 className="text-lg xs:text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex gap-4">
          <button className="hidden xs:block bg-gray-800 text-white px-4 rounded-2xl hover:bg-gray-700">
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
        className="flex gap-x-4 min-w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {gamesLoading ? (
          // Show loading placeholders
          Array(7)
            .fill(null)
            .map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="w-1/3 xs:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/7 flex-shrink-0 snap-start"
              >
                <div className="rounded-lg w-full aspect-[384/538] bg-gray-700 animate-pulse" />
              </div>
            ))
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : games.length === 0 ? (
          <div>No games available for this provider.</div>
        ) : (
          games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${provider}/${game.id}`}
              className="w-1/3 xs:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/7 flex-shrink-0 snap-start transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <Image
                src={game.imageUrl}
                alt={game.name}
                width={384}
                height={538}
                style={{ border: game.border }}
                className="rounded-lg w-full h-auto"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default GamesCarousel;
