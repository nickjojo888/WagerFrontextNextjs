import React from "react";
import Image from "next/image";
import newWagerLogo from "@/public/logos/new_wager_logo.png";
import IframeViewOptions from "@/app/components/play_game/iframe_menu/IframeViewOptions";
import RealPlayToggle from "@/app/components/play_game/iframe_menu/RealPlayToggle";

const IframeMenu: React.FC = () => {
  return (
    <div className="h-16 bg-gray-800 text-white p-2 xs:p-4 flex justify-between items-center border-t border-gray-700">
      <IframeViewOptions />
      <Image
        src={newWagerLogo}
        alt="Wager Logo"
        priority
        width={464}
        height={118}
        className={"h-1/2 xs:h-full w-auto shrink-0 grayscale"}
      />
      <RealPlayToggle />
    </div>
  );
};

export default IframeMenu;
