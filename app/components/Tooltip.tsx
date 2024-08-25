import React from "react";
import clsx from "clsx";

type TooltipProps = {
  text: string;
};

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div
      role="tooltip"
      className="absolute bottom-full left-1/2 transform -translate-x-1/4 mb-2 bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-sm whitespace-nowrap"
    >
      {text}
    </div>
  );
};

export default Tooltip;
