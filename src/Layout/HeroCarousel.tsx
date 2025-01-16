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
import Image from "next/image";
import HeroImage1 from "@/public/hero-bg.png";

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
              <Image
                src={HeroImage1}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay content for the hero section */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="w-45 text-black text-center text-4xl font-bold">
                Pure, Fresh, Organic - Straight from Nature to Your Home {index + 1}
                </h1>
                <p className="text-black text-center">Bringing Nature's Purity to Your Home</p>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Shop Now</button>
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