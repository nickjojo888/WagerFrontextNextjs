import Image from "next/image";
import Carousel from "./components/promotion_carousel/Carousel";
import ShadowDivider from "./components/general/ShadowDivider";
import SearchOptions from "./components/game_search/SearchOptions";
import GamesCarousel from "./components/game_carousel/GamesCarousel";
import {
  ControllerSVG,
  CardsSVG,
  HeadPhonesSVG,
  PokerChipSVG,
} from "@/public/svgs/SVGComponents";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <Carousel />
      <ShadowDivider />
      <SearchOptions />
      <GamesCarousel
        category="wager"
        title="Wager Games"
        Icon={<ControllerSVG width={24} height={24} />}
      />
      <GamesCarousel
        category="slots"
        title="Slot Games"
        Icon={<PokerChipSVG width={24} height={24} />}
      />
      <GamesCarousel
        category="liveCasino"
        title="Live Casino"
        Icon={<HeadPhonesSVG width={24} height={24} />}
      />
      <GamesCarousel
        category="table"
        title="Table Games"
        Icon={<CardsSVG width={24} height={24} />}
      />
    </main>
  );
}
