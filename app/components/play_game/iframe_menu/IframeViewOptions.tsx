import React from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { RxEnterFullScreen } from "react-icons/rx";
import IframeViewOptionTooltip from "./IframeViewOptionTooltip";
import StarIcon from "@/public/svgs/star-outline.svg";
import StatsIcon from "@/public/svgs/stats-chart-outline.svg";

const IframeViewOptions: React.FC = () => {
  return (
    <div className="flex gap-x-1 xs:gap-x-4">
      <div className="hidden xs:block relative group">
        <button className="p-2 hover:bg-gray-700 rounded relative">
          <SlSizeFullscreen size={20} />
          <IframeViewOptionTooltip text="Fullscreen" />
        </button>
      </div>
      <div className="hidden xs:block relative group">
        <button className="p-2 hover:bg-gray-700 rounded relative">
          <RxEnterFullScreen size={20} />
          <IframeViewOptionTooltip text="Theatre Mode" />
        </button>
      </div>
      <div className="relative group">
        <button className="p-2 hover:bg-gray-700 rounded relative">
          <StatsIcon height={20} width={20} />
          <IframeViewOptionTooltip text="Live Stats" />
        </button>
      </div>
      <div className="relative group">
        <button className="p-2 hover:bg-gray-700 rounded relative">
          <StarIcon height={20} width={20} />
          <IframeViewOptionTooltip text="Favourite" />
        </button>
      </div>
    </div>
  );
};

export default IframeViewOptions;
