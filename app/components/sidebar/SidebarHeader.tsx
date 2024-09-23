import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import MenuIcon from "@/public/svgs/menu-outline.svg";
import HomeIcon from "@/public/svgs/home-outline.svg";
import { SportsSVG } from "@/public/svgs/SVGComponents";
import Tooltip from "./SidebarTooltip";

interface SidebarHeaderProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  pathname: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isExpanded,
  toggleSidebar,
  pathname,
}) => {
  const isSportsActive = pathname.startsWith("/sports");
  const [showHomeTooltip, setShowHomeTooltip] = useState(false);
  const [showSportsTooltip, setShowSportsTooltip] = useState(false);

  return (
    <div
      className={clsx(
        "flex justify-center lg:justify-between items-center w-full",
        {
          "pb-4 pt-4 lg:pt-0 lg:pb-0 lg:h-20 flex-row gap-2": isExpanded,
          "flex-col pb-4": !isExpanded,
        }
      )}
    >
      <button
        className={clsx("hidden lg:block text-white", {
          "h-20": !isExpanded,
        })}
        onClick={toggleSidebar}
      >
        <MenuIcon width={24} height={24} />
      </button>
      <div
        className={clsx("flex bg-gray-700 rounded-lg overflow-hidden w-full", {
          "flex-col": !isExpanded,
          "flex-row": isExpanded,
          "mt-2 lg:mt-0": !isExpanded,
        })}
      >
        <div
          className="relative flex-grow"
          onMouseEnter={() => setShowHomeTooltip(true)}
          onMouseLeave={() => setShowHomeTooltip(false)}
        >
          <Link
            href="/"
            className={clsx(
              "p-3 flex items-center justify-center w-full h-full",
              {
                "border-b border-gray-600": !isExpanded,
                "border-r border-gray-600": isExpanded,
                "bg-primary": !isSportsActive,
              }
            )}
          >
            <HomeIcon width={24} height={24} />
            {isExpanded && <span className="ml-2">Home</span>}
          </Link>
        </div>
        <div
          className="relative flex-grow"
          onMouseEnter={() => setShowSportsTooltip(true)}
          onMouseLeave={() => setShowSportsTooltip(false)}
        >
          <Link
            href="/sports"
            className={clsx(
              "p-3 flex items-center justify-center w-full h-full",
              {
                "bg-primary": isSportsActive,
              }
            )}
          >
            <SportsSVG width={24} height={24} />
            {isExpanded && <span className="ml-2">Sports</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
