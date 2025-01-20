"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";

const dummyReels = [
  {
    _id: "1",
    link: "https://youtube.com/embed/yf4K1hPcINQ?si=nAFiNBJxNuGrO_54",
  },
  {
    _id: "2",
    link: "https://youtube.com/embed/K5xdztR0DUE?si=eDKLhve4hMP0GI2i",
  },
  {
    _id: "3",
    link: "https://youtube.com/embed/VF_5Jax7OT4?si=LAwGSSke3VNZkX_Q",
  },
  {
    _id: "4",
    link: "https://youtube.com/embed/fxg6ozs-nQo?si=xnRwpFBygD1zHIIf",
  },
  {
    _id: "5",
    link: "https://youtube.com/embed/bgs7x1utTf8?si=s-Jg_NM61fhJb51f",
  },
];

export function ReelsCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1, // Scroll 1 slide at a time (mobile optimized)
    },
    [autoplay.current]
  );

  useEffect(() => {
    if (emblaApi) {
      autoplay.current?.play();
    }
  }, [emblaApi]);

  return (
    <section className="container py-14 bg-white text-black mx-auto">
      <main>
        {dummyReels.length === 0 ? (
          <p>No reels available. Start by uploading one!</p>
        ) : (
          <div ref={emblaRef} className="embla overflow-hidden">
            <div className="embla__container flex space-x-4">
              {dummyReels.map((reel) => (
                <div
                  key={reel._id}
                  className="embla__slide min-w-[calc(100%/1.25)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/4)] px-2"
                >
                  <div className="relative">
                    <iframe
                      height="560"
                      src={reel.link}
                      className="w-full rounded-md"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Reel ${reel._id}`}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
