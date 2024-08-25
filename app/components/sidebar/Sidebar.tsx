"use client";
import Link from "next/link";
import {
  HeadPhonesSVG,
  HandShakeSVG,
  ProvidersSVG,
  GameShowsSVG,
  RouletteSVG,
  CardsSVG,
  PokerChipSVG,
  ControllerSVG,
  FocusSVG,
  SportsSVG,
  DiceSVG,
  BitcoinSVG,
  DollarSVG,
  BetSlipSVG,
} from "@/app/assets/svgs/SVGComponents";
import MenuIcon from "@/app/assets/svgs/menu-outline.svg";
import HomeIcon from "@/app/assets/svgs/home-outline.svg";
import StarIcon from "@/app/assets/svgs/star-outline.svg";
import RecentIcon from "@/app/assets/svgs/time-outline.svg";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import clsx from "clsx";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={clsx(
        "bg-gray-800 text-white h-screen p-4 transition-all duration-300",
        {
          "w-64": isExpanded,
          "w-16": !isExpanded,
        }
      )}
    >
      <div className="flex items-center justify-center mb-8">
        <button onClick={toggleSidebar} className="text-white">
          <MenuIcon width={24} height={24} />
        </button>
      </div>

      <ul className="flex flex-col gap-y-4">
        <SidebarLink
          href="/"
          icon={<HomeIcon width={24} height={24} />}
          text="Home"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/favourites"
          icon={<StarIcon width={24} height={24} />}
          text="Favourites"
          disabled={true}
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/recents"
          icon={<RecentIcon width={24} height={24} />}
          text="Recents"
          disabled={true}
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/mybets"
          icon={<DollarSVG width={24} height={24} />}
          text="My Bets"
          disabled={true}
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/slots"
          icon={<CardsSVG width={24} height={24} />}
          text="Slots"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/live-casino"
          icon={<HeadPhonesSVG width={24} height={24} />}
          text="Live Casino"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/blackjack"
          icon={<HandShakeSVG width={24} height={24} />}
          text="Blackjack"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/roulette"
          icon={<RouletteSVG width={24} height={24} />}
          text="Roulette"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/game-shows"
          icon={<GameShowsSVG width={24} height={24} />}
          text="Game Shows"
          isExpanded={isExpanded}
        />
        <SidebarLink
          href="/providers"
          icon={<ProvidersSVG width={24} height={24} />}
          text="Providers"
          isExpanded={isExpanded}
        />
      </ul>

      {isExpanded && (
        <button className="mt-8 bg-primary w-full py-3 text-white rounded">
          BUY CRYPTO
        </button>
      )}
    </aside>
  );
}
