import React from "react";

interface CarouselButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    className={`bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 xs:w-12 xs:h-12 flex items-center justify-center self-center rounded-full ${
      disabled ? "opacity-50 pointer-events-none" : ""
    }`}
    disabled={disabled}
  >
    {direction === "prev" ? "<" : ">"}
  </button>
);

export default CarouselButton;
