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
} from "@/public/svgs/SVGComponents";
import MenuIcon from "@/public/svgs/menu-outline.svg";
import HomeIcon from "@/public/svgs/home-outline.svg";
import StarIcon from "@/public/svgs/star-outline.svg";
import RecentIcon from "@/public/svgs/time-outline.svg";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import clsx from "clsx";
import SidebarGroup from "./SidebarGroup"; // New import

interface SidebarProps {
  isExpanded: boolean; // controls whether sidebar is expanded
  toggleSidebar: () => void; // function to control the state that is passed to isExpanded
}

export default function Sidebar({ isExpanded, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={clsx(
        "bg-gray-800 text-white h-screen p-2 transition-all duration-300",
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
        <SidebarGroup>
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
        </SidebarGroup>

        <SidebarGroup>
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
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLink
            href="/providers"
            icon={<ProvidersSVG width={24} height={24} />}
            text="Providers"
            isExpanded={isExpanded}
          />
        </SidebarGroup>
      </ul>

      {isExpanded && (
        <button className="mt-8 bg-primary w-full py-3 text-white rounded">
          BUY CRYPTO
        </button>
      )}
    </aside>
  );
}
