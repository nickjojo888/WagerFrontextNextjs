import Image from "next/image";
import Carousel from "./components/carousels/promotion_carousel/PromotionCarousel";
import ShadowDivider from "./components/general/ShadowDivider";
import SearchOptions from "./components/game_search/SearchOptions";
import GamesCarousel from "./components/carousels/game_carousel/GamesCarousel";
import ProviderCarousel from "./components/carousels/provider_carousel/ProviderCarousel";
import {
  ControllerSVG,
  CardsSVG,
  HeadPhonesSVG,
  PokerChipSVG,
} from "@/public/svgs/SVGComponents";
import WagerGamesCarousel from "./components/carousels/game_carousel/WagerGamesCarousel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8 px-5 md:px-10">
      <Carousel />
      <ShadowDivider />
      <SearchOptions />
      <WagerGamesCarousel
        provider="PRAGMATIC"
        title="Wager games"
        Icon={<PokerChipSVG width={24} height={24} />}
      />
      <GamesCarousel
        provider="PRAGMATIC"
        title="PRAGMATIC games"
        Icon={<PokerChipSVG width={24} height={24} />}
      />
      <GamesCarousel
        provider="REELKINGDOM"
        title="REELKINGDOM games"
        Icon={<HeadPhonesSVG width={24} height={24} />}
      />
      <ProviderCarousel />
      <GamesCarousel
        provider="HABANERO"
        title="HABANERO games"
        Icon={<ControllerSVG width={24} height={24} />}
      />
      <GamesCarousel
        provider="DREAMTECH"
        title="DREAMTECH games"
        Icon={<CardsSVG width={24} height={24} />}
      />
    </div>
  );
}
