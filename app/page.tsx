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
import { getGames } from "./components/carousels/game_carousel/getGames";

export const dynamic = "force-dynamic";

export default async function Home() {
  const pragmaticGames = await getGames("PRAGMATIC");
  const reelkingdomGames = await getGames("REELKINGDOM");
  const habaneroGames = await getGames("HABANERO");
  const dreamtechGames = await getGames("DREAMTECH");

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 px-5 md:px-10">
      <Carousel />
      <ShadowDivider />
      <SearchOptions />
      <WagerGamesCarousel
        title="Wager Games"
        Icon={<PokerChipSVG width={24} height={24} />}
      />
      <GamesCarousel
        provider="PRAGMATIC"
        title="PRAGMATIC Games"
        Icon={<PokerChipSVG width={24} height={24} />}
        games={pragmaticGames}
      />
      <GamesCarousel
        provider="REELKINGDOM"
        title="REELKINGDOM Games"
        Icon={<HeadPhonesSVG width={24} height={24} />}
        games={reelkingdomGames}
      />
      <ProviderCarousel />
      <GamesCarousel
        provider="HABANERO"
        title="HABANERO Games"
        Icon={<ControllerSVG width={24} height={24} />}
        games={habaneroGames}
      />
      <GamesCarousel
        provider="DREAMTECH"
        title="DREAMTECH Games"
        Icon={<CardsSVG width={24} height={24} />}
        games={dreamtechGames}
      />
    </div>
  );
}
