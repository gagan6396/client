"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full h-96 relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {/* Hero Carousel Items */}
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="relative">
            <div className="w-full h-full">
              <img
                src={`https://via.placeholder.com/1500x500?text=Slide+${
                  index + 1
                }`}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay content for the hero section */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h2 className="text-white text-4xl font-bold">
                  Hero Section {index + 1}
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Carousel Navigation */}
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl">
        &#8592;
      </CarouselPrevious>
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl">
        &#8594;
      </CarouselNext>
    </Carousel>
  );
}