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
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <div className="text-primary">
          <DiceSVG width={24} height={24} />
        </div>
        <h1 className="text-lg font-bold">Wager</h1>
      </div>

      {/* Use flex-col to make the list items stack vertically, and gap-y-4 to add vertical spacing */}
      <ul className="flex flex-col gap-y-4">
        <SidebarLink
          href="/"
          icon={<FocusSVG width={24} height={24} />}
          text="Home"
        />
        <SidebarLink
          href="/challenges"
          icon={<PokerChipSVG width={24} height={24} />}
          text="Challenges"
        />
        <SidebarLink
          href="/weekly-race"
          icon={<DollarSVG width={24} height={24} />}
          text="$20K Weekly Race"
        />
        <SidebarLink
          href="/originals"
          icon={<ControllerSVG width={24} height={24} />}
          text="Originals"
        />
        {/* Add more sidebar links as needed */}
      </ul>

      <button className="mt-8 bg-primary w-full py-3 text-white rounded">
        BUY CRYPTO
      </button>
    </aside>
  );
}
