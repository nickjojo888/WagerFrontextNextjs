"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CarouselButton, CarouselDirection } from "./PromotionCarouselButton";

const images = [
  "/images/dummy/Banner 1.jpg",
  "/images/dummy/Banner 2.png",
  "/images/dummy/Banner 3.png",
  "/images/dummy/Banner 4.png",
];

export default function Carousel() {
  const [isHovering, setIsHovering] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // function to scroll to the left or right end of carousel
  const scrollToEnd = (direction: CarouselDirection) => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === CarouselDirection.Left
          ? 0
          : carouselRef.current.scrollWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Function to check scroll position and update state
  // scrollLeft: distance from the left edge of the scrollable area to the leftmost visible content
  // scrollWidth: total width of the scrollable content
  // clientWidth: width of the visible area
  // This function determines if we're at the start or end of the carousel
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // -1 to account for small discrepancies
    }
  };

  // when component mounts, add event listener to check scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Check initial position
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          ref={carouselRef}
          className="flex gap-x-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full xs:w-1/2 md:w-1/3 flex-shrink-0 snap-start"
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={854}
                height={467}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <CarouselButton
        visible={isHovering && !isAtStart}
        direction={CarouselDirection.Left}
        onClick={() => scrollToEnd(CarouselDirection.Left)}
      />
      <CarouselButton
        visible={isHovering && !isAtEnd}
        direction={CarouselDirection.Right}
        onClick={() => scrollToEnd(CarouselDirection.Right)}
      />
    </div>
  );
}
