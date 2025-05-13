// Inspired by various accessible carousel patterns and shadcn/ui styling
"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string | StaticImageData;
  alt: string;
  hint?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  className?: string;
  imageClassName?: string;
  showNavigation?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({
  images,
  className,
  imageClassName,
  showNavigation = true,
  showDots = true,
  autoPlay = true,
  interval = 5000, // 5 seconds
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  React.useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    resetTimeout();
    timeoutRef.current = setTimeout(goToNext, interval);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoPlay, interval, goToNext, images.length, resetTimeout]);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-64 bg-muted rounded-lg",
          className
        )}
        role="region"
        aria-label="Image carousel"
      >
        <p className="text-muted-foreground">No images to display.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]", // Adjust aspect ratio for better hero visuals
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image gallery"
    >
      <div
        className="absolute inset-0 w-full h-full"
        aria-live={autoPlay ? "off" : "polite"}
        aria-atomic="false"
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            data-ai-hint={image.hint}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
              imageClassName
            )}
            priority={index === 0} // Prioritize loading the first image
            aria-hidden={index !== currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`Image ${index + 1} of ${images.length}: ${image.alt}`}
          />
        ))}
      </div>

      {showNavigation && images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 hover:bg-background/80 text-foreground z-20 p-2"
            onClick={() => {
              goToPrevious();
              resetTimeout(); // Reset autoplay timer on manual navigation
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 hover:bg-background/80 text-foreground z-20 p-2"
            onClick={() => {
              goToNext();
              resetTimeout(); // Reset autoplay timer on manual navigation
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20" role="tablist" aria-label="Image slide controls">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetTimeout(); // Reset autoplay timer on manual navigation
              }}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out",
                currentIndex === index
                  ? "bg-primary scale-125"
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to image ${index + 1}`}
              aria-controls={`carousel-image-${index}`} // Assuming images could have IDs like this
            />
          ))}
        </div>
      )}
    </div>
  );
}
