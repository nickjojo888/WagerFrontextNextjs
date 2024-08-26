import { useState, useEffect } from "react";
import { Game } from "./types";

const games: Game[] = [
  {
    id: 1,
    name: "HiLo",
    imageUrl: "/images/games/wager/hilo.jpg",
    border: "2px solid rgb(98, 179, 251)",
  },
  {
    id: 2,
    name: "Blackjack",
    imageUrl: "/images/games/wager/blackjack.jpg",
    border: "2px solid rgb(240, 37, 37)",
  },
  {
    id: 3,
    name: "Dice",
    imageUrl: "/images/games/wager/dice.jpg",
    border: "2px solid rgb(1, 239, 82)",
  },
  {
    id: 4,
    name: "Crash",
    imageUrl: "/images/games/wager/crash.jpg",
    border: "2px solid rgb(143, 120, 251)",
  },
  {
    id: 5,
    name: "Keno",
    imageUrl: "/images/games/wager/keno.jpg",
    border: "2px solid rgb(252, 143, 2)",
  },
  {
    id: 6,
    name: "Limbo",
    imageUrl: "/images/games/wager/limbo.jpg",
    border: "2px solid rgb(136, 207, 0)",
  },
  {
    id: 7,
    name: "Mines",
    imageUrl: "/images/games/wager/mines.jpg",
    border: "2px solid rgb(247, 210, 96)",
  },
  {
    id: 8,
    name: "Plinko",
    imageUrl: "/images/games/wager/planko.jpg",
    border: "2px solid rgb(247, 0, 158)",
  },
  {
    id: 9,
    name: "Roulette",
    imageUrl: "/images/games/wager/roulette.jpg",
    border: "2px solid rgb(155, 38, 251)",
  },
  {
    id: 10,
    name: "Wheel",
    imageUrl: "/images/games/wager/wheel.jpg",
    border: "2px solid rgb(52, 101, 252)",
  },
  {
    id: 1,
    name: "HiLo",
    imageUrl: "/images/games/wager/hilo.jpg",
    border: "2px solid rgb(98, 179, 251)",
  },
  {
    id: 2,
    name: "Blackjack",
    imageUrl: "/images/games/wager/blackjack.jpg",
    border: "2px solid rgb(240, 37, 37)",
  },
  {
    id: 3,
    name: "Dice",
    imageUrl: "/images/games/wager/dice.jpg",
    border: "2px solid rgb(1, 239, 82)",
  },
  {
    id: 4,
    name: "Crash",
    imageUrl: "/images/games/wager/crash.jpg",
    border: "2px solid rgb(143, 120, 251)",
  },
  {
    id: 5,
    name: "Keno",
    imageUrl: "/images/games/wager/keno.jpg",
    border: "2px solid rgb(252, 143, 2)",
  },
  {
    id: 6,
    name: "Limbo",
    imageUrl: "/images/games/wager/limbo.jpg",
    border: "2px solid rgb(136, 207, 0)",
  },
  {
    id: 7,
    name: "Mines",
    imageUrl: "/images/games/wager/mines.jpg",
    border: "2px solid rgb(247, 210, 96)",
  },
  {
    id: 8,
    name: "Plinko",
    imageUrl: "/images/games/wager/planko.jpg",
    border: "2px solid rgb(247, 0, 158)",
  },
  {
    id: 9,
    name: "Roulette",
    imageUrl: "/images/games/wager/roulette.jpg",
    border: "2px solid rgb(155, 38, 251)",
  },
  {
    id: 10,
    name: "Wheel",
    imageUrl: "/images/games/wager/wheel.jpg",
    border: "2px solid rgb(52, 101, 252)",
  },
  {
    id: 1,
    name: "HiLo",
    imageUrl: "/images/games/wager/hilo.jpg",
    border: "2px solid rgb(98, 179, 251)",
  },
  {
    id: 2,
    name: "Blackjack",
    imageUrl: "/images/games/wager/blackjack.jpg",
    border: "2px solid rgb(240, 37, 37)",
  },
  {
    id: 3,
    name: "Dice",
    imageUrl: "/images/games/wager/dice.jpg",
    border: "2px solid rgb(1, 239, 82)",
  },
  {
    id: 4,
    name: "Crash",
    imageUrl: "/images/games/wager/crash.jpg",
    border: "2px solid rgb(143, 120, 251)",
  },
  {
    id: 5,
    name: "Keno",
    imageUrl: "/images/games/wager/keno.jpg",
    border: "2px solid rgb(252, 143, 2)",
  },
  {
    id: 6,
    name: "Limbo",
    imageUrl: "/images/games/wager/limbo.jpg",
    border: "2px solid rgb(136, 207, 0)",
  },
  {
    id: 7,
    name: "Mines",
    imageUrl: "/images/games/wager/mines.jpg",
    border: "2px solid rgb(247, 210, 96)",
  },
  {
    id: 8,
    name: "Plinko",
    imageUrl: "/images/games/wager/planko.jpg",
    border: "2px solid rgb(247, 0, 158)",
  },
  {
    id: 9,
    name: "Roulette",
    imageUrl: "/images/games/wager/roulette.jpg",
    border: "2px solid rgb(155, 38, 251)",
  },
  {
    id: 10,
    name: "Wheel",
    imageUrl: "/images/games/wager/wheel.jpg",
    border: "2px solid rgb(52, 101, 252)",
  },
];

const slotGames: Game[] = [
  {
    id: 101,
    name: "Rich Wilde",
    imageUrl: "/images/games/slots/rich-wilde.avif",
    border: "2px solid rgb(211, 1, 254)",
  },
  {
    id: 102,
    name: "Sweet Bonanza",
    imageUrl: "/images/games/slots/sweet-bonanza.avif",
    border: "2px solid rgb(251, 90, 144)",
  },
  {
    id: 103,
    name: "Wanted",
    imageUrl: "/images/games/slots/wanted.avif",
    border: "2px solid rgb(232, 38, 15)",
  },
  {
    id: 104,
    name: "Moon Princess",
    imageUrl: "/images/games/slots/moon-princess.avif",
    border: "2px solid rgb(229, 20, 108)",
  },
  {
    id: 105,
    name: "Sugar Rush",
    imageUrl: "/images/games/slots/sugar-rush.avif",
    border: "2px solid rgb(182, 129, 253)",
  },
  {
    id: 106,
    name: "Madness Tombe",
    imageUrl: "/images/games/slots/madness-tombe.avif",
    border: "2px solid rgb(64, 97, 152)",
  },
  {
    id: 107,
    name: "Sugar Thousand",
    imageUrl: "/images/games/slots/sugar-thousand.avif",
    border: "2px solid rgb(250, 158, 0)",
  },
  {
    id: 108,
    name: "Olympus Gates",
    imageUrl: "/images/games/slots/olympus-gates.avif",
    border: "2px solid rgb(234, 137, 20)",
  },
  {
    id: 109,
    name: "Slayers Inc",
    imageUrl: "/images/games/slots/slayers-inc.avif",
    border: "2px solid rgb(186, 215, 0)",
  },
  {
    id: 110,
    name: "Le Bandit",
    imageUrl: "/images/games/slots/lebandit.avif",
    border: "2px solid rgb(218, 115, 16)",
  },
];

const liveCasinoGames: Game[] = [
  {
    id: 201,
    name: "Roulette Live",
    imageUrl: "/images/games/casino/roulette-live.avif",
    border: "2px solid rgb(243, 14, 3)",
  },
  {
    id: 202,
    name: "Blackjack",
    imageUrl: "/images/games/casino/blackjack.avif",
    border: "2px solid rgb(255, 187, 0)",
  },
  {
    id: 203,
    name: "Blackjack Live",
    imageUrl: "/images/games/casino/backjack-live.avif",
    border: "2px solid rgb(0, 199, 29)",
  },
  {
    id: 204,
    name: "Baccarat",
    imageUrl: "/images/games/casino/baccarat.avif",
    border: "2px solid rgb(236, 0, 48)",
  },
  {
    id: 205,
    name: "Super Andar",
    imageUrl: "/images/games/casino/super-andar.avif",
    border: "2px solid rgb(239, 180, 0)",
  },
  {
    id: 206,
    name: "Crazy Pachinko",
    imageUrl: "/images/games/casino/crazy-pachinko.avif",
    border: "2px solid rgb(220, 171, 18)",
  },
  {
    id: 207,
    name: "Peek Baccarat",
    imageUrl: "/images/games/casino/peek-baccarat.avif",
    border: "2px solid rgb(255, 191, 100)",
  },
  {
    id: 208,
    name: "Lightning Dice",
    imageUrl: "/images/games/casino/lightning-dice.avif",
    border: "2px solid rgb(255, 168, 67)",
  },
  {
    id: 209,
    name: "Mega Roulette",
    imageUrl: "/images/games/casino/mega-roulette.avif",
    border: "2px solid rgb(96, 177, 249)",
  },
  {
    id: 210,
    name: "Super Trunfo",
    imageUrl: "/images/games/casino/super-trunfo.avif",
    border: "2px solid rgb(239, 156, 37)",
  },
];

const tableGames: Game[] = [
  {
    id: 301,
    name: "FP Blackjack",
    imageUrl: "/images/games/casino/fp-blackjack.avif",
    border: "2px solid rgb(21, 192, 112)",
  },
  {
    id: 302,
    name: "Blackjack",
    imageUrl: "/images/games/casino/blackjack.avif",
    border: "2px solid rgb(255, 187, 0)",
  },
  {
    id: 303,
    name: "Blackjack Live",
    imageUrl: "/images/games/casino/backjack-live.avif",
    border: "2px solid rgb(0, 199, 29)",
  },
  {
    id: 304,
    name: "Baccarat",
    imageUrl: "/images/games/casino/baccarat.avif",
    border: "2px solid rgb(236, 0, 48)",
  },
  {
    id: 305,
    name: "Super Andar",
    imageUrl: "/images/games/casino/super-andar.avif",
    border: "2px solid rgb(239, 180, 0)",
  },
  {
    id: 306,
    name: "Peek Baccarat",
    imageUrl: "/images/games/casino/peek-baccarat.avif",
    border: "2px solid rgb(255, 191, 100)",
  },
  {
    id: 307,
    name: "Major Roulette",
    imageUrl: "/images/games/table/major-roulette.avif",
    border: "2px solid rgb(96, 177, 249)",
  },
  {
    id: 308,
    name: "Super Trunfo",
    imageUrl: "/images/games/casino/super-trunfo.avif",
    border: "2px solid rgb(239, 156, 37)",
  },
  {
    id: 309,
    name: "European Roulette",
    imageUrl: "/images/games/table/europeean-roulettte.avif",
    border: "2px solid rgb(251, 73, 190)",
  },
];

export type GameCategory = "all" | "wager" | "slots" | "liveCasino" | "table";

export const useGames = (category: GameCategory = "all") => {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);

  useEffect(() => {
    let gamesArray: Game[];
    switch (category) {
      case "wager":
        gamesArray = games;
        break;
      case "slots":
        gamesArray = slotGames;
        break;
      case "liveCasino":
        gamesArray = liveCasinoGames;
        break;
      case "table":
        gamesArray = tableGames;
        break;
      case "all":
      default:
        gamesArray = [
          ...games,
          ...slotGames,
          ...liveCasinoGames,
          ...tableGames,
        ];
        break;
    }
    setSelectedGames(gamesArray);
  }, [category]);

  return selectedGames;
};
