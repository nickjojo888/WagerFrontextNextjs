"use client";
import React, { useRef, useState, useEffect } from "react";
import CarouselButton from "../CarouselButton";
import Image from "next/image";
import Link from "next/link";
import { Game } from "./types";

interface GamesCarouselProps {
  provider: string;
  title: string;
  Icon: React.ReactNode;
}

const WagerGamesCarousel: React.FC<GamesCarouselProps> = ({
  provider,
  title,
  Icon,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Hardcoded list of games
  const games: Game[] = [
    {
      id: "game1",
      name: "Poker",
      imageUrl: "/images/games/wager/Frame 6.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game2",
      name: "Slots",
      imageUrl: "/images/games/wager/Frame 7.png",
      provider: "ProviderB",
      providerCode: "PB",
      gameType: "slot",
    },
    {
      id: "game3",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 8.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game4",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 9.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game5",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 10.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game6",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 11.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game7",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 12.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game8",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 13.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game9",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 14.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
    {
      id: "game10",
      name: "Blackjack",
      imageUrl: "/images/games/wager/Frame 15.png",
      provider: "ProviderA",
      providerCode: "PA",
      gameType: "card",
    },
  ];

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
        {games.length === 0 ? (
          <div>No games available for this game type.</div>
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
                width={200}
                height={200}
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

export default WagerGamesCarousel;
