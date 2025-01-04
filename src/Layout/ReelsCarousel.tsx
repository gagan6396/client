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

export function ReelsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="w-full h-full relative">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[500px] md:h-[700px] max-w-full overflow-hidden"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="flex flex-col space-y-6 ">
          {/* Reels Items */}
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="relative h-full ">
              {/* Each Reel Content */}
              <div className="w-full h-full relative">
                <video
                  src={`https://www.w3schools.com/html/mov_bbb.mp4`}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="text-white text-lg md:text-2xl font-bold">
                    Reel {index + 1} - Title
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl">
          &#8592;
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2  text-4xl">
          &#8594;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
