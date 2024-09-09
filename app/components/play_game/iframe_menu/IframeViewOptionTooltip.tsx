import React from "react";

interface IframeViewOptionTooltipProps {
  text: string;
}

const IframeViewOptionTooltip: React.FC<IframeViewOptionTooltipProps> = ({
  text,
}) => {
  return (
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-black text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
      {text}
    </span>
  );
};

export default IframeViewOptionTooltip;
