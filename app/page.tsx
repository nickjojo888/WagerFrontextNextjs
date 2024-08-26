import Image from "next/image";
import Carousel from "./components/promotion_carousel/Carousel";
import ShadowDivider from "./components/general/ShadowDivider";
import SearchOptions from "./components/game_search/SearchOptions";
import GamesCarousel from "./components/game_carousel/GamesCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <Carousel />
      <ShadowDivider />
      <SearchOptions />
      <GamesCarousel />
    </main>
  );
}
