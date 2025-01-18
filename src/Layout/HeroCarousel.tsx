"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
      <CarouselContent className="relative overflow-hidden">
        {/* Hero Carousel Items */}
        {Array.from({ length: 1 }).map((_, index) => (
          <CarouselItem key={index} className="relative">
            <div className="relative w-full h-64 sm:h-80 md:h-96 p-5">
              <Image
                src={HeroImage1}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-3xl"
                priority
              />
              {/* Overlay content for the hero section */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-fadeIn">
                <h1 className="text-[#2B0504] text-center text-2xl sm:text-3xl md:text-4xl font-bold px-4">
                  Pure, Fresh, Organic - Straight from Nature to Your Home{" "}
                  {index + 1}
                </h1>
                <p className="text-[#2B0504] text-center text-sm sm:text-base">
                  Bringing Nature&apos;s Purity to Your Home
                </p>
                <Button
                  type="button"
                  className="rounded bg-[#2B0504] text-white px-6 py-2 mt-2 hover:bg-[#3c0707] transition-all duration-300"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
