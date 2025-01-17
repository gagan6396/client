"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroImage1 from "@/public/hero-bg.png";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {/* Hero Carousel Items */}
        {Array.from({ length: 1 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full">
              <Image
                src={HeroImage1}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay content for the hero section */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <h1 className="w-45 text-[#2B0504] text-center text-4xl font-bold">
                  Pure, Fresh, Organic - Straight from Nature to Your Home{" "}
                  {index + 1}
                </h1>
                <p className="text-[#2B0504] text-center">
                  Bringing Nature's Purity to Your Home
                </p>
                <Button type="button" className=" rounded bg-[#2B0504]">
                  Shop Now
                </Button>
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
