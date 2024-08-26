import clsx from "clsx";

export enum CarouselDirection {
  Left = "left",
  Right = "right",
}

interface CarouselButtonProps {
  visible: boolean;
  direction: CarouselDirection;
  onClick: () => void;
}

export function CarouselButton({
  visible,
  direction,
  onClick,
}: CarouselButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-50 text-gray-800",
        "w-6 h-6 rounded-full flex items-center justify-center z-10 text-sm",
        "hover:bg-opacity-75 transition-opacity duration-300",
        {
          "opacity-100": visible,
          "opacity-0 pointer-events-none": !visible,
          "left-2": direction === CarouselDirection.Left,
          "right-2": direction === CarouselDirection.Right,
        }
      )}
    >
      {direction === CarouselDirection.Left ? "\u003C" : "\u003E"}
    </button>
  );
}
