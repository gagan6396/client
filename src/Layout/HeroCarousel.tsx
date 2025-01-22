"use client";
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
            <div className="relative w-full p-5">
              <Image
                src={HeroImage1}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain rounded-3xl"
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
