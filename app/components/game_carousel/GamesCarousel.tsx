"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ControllerSVG,
  HandShakeSVG,
  ProvidersSVG,
  GameShowsSVG,
  RouletteSVG,
  CardsSVG,
  PokerChipSVG,
  FocusSVG,
  SportsSVG,
  DiceSVG,
  BitcoinSVG,
  DollarSVG,
  BetSlipSVG,
} from "@/public/svgs/SVGComponents";

interface Game {
  id: number;
  title: string;
  imageUrl: string;
  border: string;
}

const GamesCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Updated games data to conform to the Game interface
  const games: Game[] = [
    {
      id: 1,
      title: "HiLo",
      imageUrl: "/images/games/wager/hilo.jpg",
      border: "2px solid rgb(98, 179, 251)",
    },
    {
      id: 2,
      title: "Blackjack",
      imageUrl: "/images/games/wager/blackjack.jpg",
      border: "2px solid rgb(240, 37, 37)",
    },
    {
      id: 3,
      title: "Dice",
      imageUrl: "/images/games/wager/dice.jpg",
      border: "2px solid rgb(1, 239, 82)",
    },
    {
      id: 4,
      title: "Crash",
      imageUrl: "/images/games/wager/crash.jpg",
      border: "2px solid rgb(143, 120, 251)",
    },
    {
      id: 5,
      title: "Keno",
      imageUrl: "/images/games/wager/keno.jpg",
      border: "2px solid rgb(252, 143, 2)",
    },
    {
      id: 6,
      title: "Limbo",
      imageUrl: "/images/games/wager/limbo.jpg",
      border: "2px solid rgb(136, 207, 0)",
    },
    {
      id: 7,
      title: "Mines",
      imageUrl: "/images/games/wager/mines.jpg",
      border: "2px solid rgb(247, 210, 96)",
    },
    {
      id: 8,
      title: "Plinko",
      imageUrl: "/images/games/wager/planko.jpg",
      border: "2px solid rgb(247, 0, 158)",
    },
    {
      id: 9,
      title: "Roulette",
      imageUrl: "/images/games/wager/roulette.jpg",
      border: "2px solid rgb(155, 38, 251)",
    },
    {
      id: 10,
      title: "Wheel",
      imageUrl: "/images/games/wager/wheel.jpg",
      border: "2px solid rgb(52, 101, 252)",
    },
    {
      id: 1,
      title: "HiLo",
      imageUrl: "/images/games/wager/hilo.jpg",
      border: "2px solid rgb(98, 179, 251)",
    },
    {
      id: 2,
      title: "Blackjack",
      imageUrl: "/images/games/wager/blackjack.jpg",
      border: "2px solid rgb(240, 37, 37)",
    },
    {
      id: 3,
      title: "Dice",
      imageUrl: "/images/games/wager/dice.jpg",
      border: "2px solid rgb(1, 239, 82)",
    },
    {
      id: 4,
      title: "Crash",
      imageUrl: "/images/games/wager/crash.jpg",
      border: "2px solid rgb(143, 120, 251)",
    },
    {
      id: 5,
      title: "Keno",
      imageUrl: "/images/games/wager/keno.jpg",
      border: "2px solid rgb(252, 143, 2)",
    },
    {
      id: 6,
      title: "Limbo",
      imageUrl: "/images/games/wager/limbo.jpg",
      border: "2px solid rgb(136, 207, 0)",
    },
    {
      id: 7,
      title: "Mines",
      imageUrl: "/images/games/wager/mines.jpg",
      border: "2px solid rgb(247, 210, 96)",
    },
    {
      id: 8,
      title: "Plinko",
      imageUrl: "/images/games/wager/planko.jpg",
      border: "2px solid rgb(247, 0, 158)",
    },
    {
      id: 9,
      title: "Roulette",
      imageUrl: "/images/games/wager/roulette.jpg",
      border: "2px solid rgb(155, 38, 251)",
    },
    {
      id: 10,
      title: "Wheel",
      imageUrl: "/images/games/wager/wheel.jpg",
      border: "2px solid rgb(52, 101, 252)",
    },
    {
      id: 1,
      title: "HiLo",
      imageUrl: "/images/games/wager/hilo.jpg",
      border: "2px solid rgb(98, 179, 251)",
    },
    {
      id: 2,
      title: "Blackjack",
      imageUrl: "/images/games/wager/blackjack.jpg",
      border: "2px solid rgb(240, 37, 37)",
    },
    {
      id: 3,
      title: "Dice",
      imageUrl: "/images/games/wager/dice.jpg",
      border: "2px solid rgb(1, 239, 82)",
    },
    {
      id: 4,
      title: "Crash",
      imageUrl: "/images/games/wager/crash.jpg",
      border: "2px solid rgb(143, 120, 251)",
    },
    {
      id: 5,
      title: "Keno",
      imageUrl: "/images/games/wager/keno.jpg",
      border: "2px solid rgb(252, 143, 2)",
    },
    {
      id: 6,
      title: "Limbo",
      imageUrl: "/images/games/wager/limbo.jpg",
      border: "2px solid rgb(136, 207, 0)",
    },
    {
      id: 7,
      title: "Mines",
      imageUrl: "/images/games/wager/mines.jpg",
      border: "2px solid rgb(247, 210, 96)",
    },
    {
      id: 8,
      title: "Plinko",
      imageUrl: "/images/games/wager/planko.jpg",
      border: "2px solid rgb(247, 0, 158)",
    },
    {
      id: 9,
      title: "Roulette",
      imageUrl: "/images/games/wager/roulette.jpg",
      border: "2px solid rgb(155, 38, 251)",
    },
    {
      id: 10,
      title: "Wheel",
      imageUrl: "/images/games/wager/wheel.jpg",
      border: "2px solid rgb(52, 101, 252)",
    },
  ];

  const updateButtonStates = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      setIsAtStart(container.scrollLeft === 0);
      setIsAtEnd(
        container.scrollLeft + container.clientWidth >=
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
  }, []);

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
          <ControllerSVG width={24} height={24} />
          <h2 className="text-2xl font-bold">Wager Games</h2>
        </div>
        <div className="flex self-stretch gap-4">
          <button className="bg-gray-800 text-white px-4 rounded-2xl hover:bg-gray-700">
            View All
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => scrollGames("prev")}
              className={`bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 flex items-center justify-center self-center rounded-full ${
                isAtStart ? "opacity-50 pointer-events-none" : ""
              }`}
              disabled={isAtStart}
            >
              &lt;
            </button>
            <button
              onClick={() => scrollGames("next")}
              className={`bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 flex items-center justify-center self-center rounded-full ${
                isAtEnd ? "opacity-50 pointer-events-none" : ""
              }`}
              disabled={isAtEnd}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="flex-shrink-0 px-2 snap-start"
            style={{ width: "200px" }}
          >
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
        ))}
      </div>
    </div>
  );
};

export default GamesCarousel;
