"use client";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const images = [
  "/images/dummy/20k-weekly-gr.webp",
  "/images/dummy/drops_wins.webp",
  "/images/dummy/levelup2024_promo.webp",
  "/images/dummy/sb1000_promo.webp",
  "/images/dummy/treasurehunt_promo.webp",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 3 ? prevIndex : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-x-2"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-1/3 flex-shrink-0">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className={clsx(
          "absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-50 text-gray-800",
          "w-6 h-6 rounded-full flex items-center justify-center z-10 text-sm",
          "hover:bg-opacity-75 transition-opacity duration-300",
          {
            "opacity-100": isHovering && currentIndex > 0,
            "opacity-0 pointer-events-none": !(isHovering && currentIndex > 0),
          }
        )}
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className={clsx(
          "absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-50 text-gray-800",
          "w-6 h-6 rounded-full flex items-center justify-center z-10 text-sm",
          "hover:bg-opacity-75 transition-opacity duration-300",
          {
            "opacity-100": isHovering && currentIndex < images.length - 3,
            "opacity-0 pointer-events-none": !(
              isHovering && currentIndex < images.length - 3
            ),
          }
        )}
      >
        &gt;
      </button>
    </div>
  );
}
