"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageSlideshowProps {
  images: string[];
  alt: string;
}

interface NavButtonProps {
  onClick: (e: React.MouseEvent) => void;
  icon: LucideIcon;
  position: "left" | "right";
}

function NavButton({ onClick, icon: Icon, position }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 ${position === "left" ? "left-2" : "right-2"} flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/slideshow:opacity-100`}
    >
      <Icon className="size-5" />
    </button>
  );
}

export function ImageSlideshow({ images, alt }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-video">
        <Image src={images[0]} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group/slideshow relative aspect-video">
      <Image
        src={images[currentIndex]}
        alt={`${alt} - ${currentIndex + 1}`}
        fill
        className="object-cover"
      />

      {/* Navigation Buttons */}
      <NavButton onClick={goToPrevious} icon={ChevronLeft} position="left" />
      <NavButton onClick={goToNext} icon={ChevronRight} position="right" />

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, index) => (
          <button
            key={`dot-${images[index]}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`size-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
