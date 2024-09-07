"use client";
import React, { useRef, useState, useEffect } from "react";
import CarouselButton from "../CarouselButton";
import { ProvidersSVG } from "@/public/svgs/SVGComponents";
import { useProviders } from "./useProviders";

const ProviderCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const providers = useProviders();

  const updateButtonStates = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      setIsAtStart(container.scrollLeft <= 1); // Use a small threshold to account for precision issues
      setIsAtEnd(
        Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth - 1
      );
    }
  };

  useEffect(() => {
    updateButtonStates();
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", updateButtonStates);
      return () => container.removeEventListener("scroll", updateButtonStates);
    }
  }, [providers]); // Add games as a dependency to re-run effect when games change

  const scrollGames = (direction: "next" | "prev") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const gameWidth = container.children[0].clientWidth;
      const visibleWidth = container.clientWidth;
      const gamesPerView = Math.floor(visibleWidth / gameWidth);
      const scrollAmount = gameWidth * gamesPerView;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let nextScrollPosition;
      if (direction === "next") {
        nextScrollPosition = Math.min(
          container.scrollLeft + scrollAmount,
          maxScroll
        );
      } else {
        nextScrollPosition = Math.max(container.scrollLeft - scrollAmount, 0);
      }

      container.scrollTo({ left: nextScrollPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center h-12 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <ProvidersSVG width={24} height={24} />
          </div>
          <h2 className="text-lg xs:text-2xl font-bold">Providers</h2>
        </div>
        <div className="flex gap-2">
          <CarouselButton
            direction="prev"
            onClick={() => scrollGames("prev")}
            disabled={isAtStart}
          />
          <CarouselButton
            direction="next"
            onClick={() => scrollGames("next")}
            disabled={isAtEnd}
          />
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll snap-x gap-20 h-14 snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {providers.map((provider) => (
          <img
            key={provider.id}
            src={provider.imageUrl}
            alt={provider.name}
            className="snap-start w-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default ProviderCarousel;
