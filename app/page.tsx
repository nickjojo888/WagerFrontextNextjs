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
import { useAuth } from "./components/authentication/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

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
      <ProviderCarousel />
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

      {!user && (
        <div className="w-full max-w-6xl mx-auto text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Join Wager Today!</h2>
          <p className="mb-4">
            Create an account or log in to access all our features.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
