"use client";

import rishabh from "@/public/rishabh11.jpg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Testimonials Component
const Testimonials: React.FC = () => {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplay.current]
  );

  useEffect(() => {
    if (emblaApi) {
      autoplay.current?.play();
    }
  }, [emblaApi]);

  return (
    <section className="bg-gray-100 py-12 ">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
          WHAT OUR CUSTOMERS SAY ABOUT THE PRODUCTS
        </h2>

        {/* Carousel for Testimonials */}
        <div ref={emblaRef} className="embla overflow-hidden">
          <div className="embla__container flex space-x-6 py-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="embla__slide min-w-[calc(100%/1.1)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] p-4"
              >
                <div className="bg-white border rounded-lg shadow-lg p-6 text-center animate-fadeIn">
                  <p className="text-gray-700 italic">
                  &quot;Gauraaj has been a game changer for my health. Their
                    organic honey and grains have made a significant difference
                    in my diet. The quality is top-notch, and I love knowing
                    that I&quot;m supporting sustainable farming.&quot;
                  </p>
                  <div className="mt-4 flex flex-col items-center">
                    <Image
                      src={rishabh}
                      alt={`Customer ${index + 1}`}
                      className="w-16 h-16 rounded-full border-2"
                    />
                    <h4 className="mt-2 font-semibold text-gray-800">
                      Rishabh Gehlot
                    </h4>
                    <span className="text-gray-600 text-sm">
                      Health Enthusiast
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
