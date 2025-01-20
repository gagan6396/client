"use client"
import award1 from "@/public/About/award1.png";
import award2 from "@/public/About/award2.png";
import award3 from "@/public/About/award3.png";
import award4 from "@/public/About/award4.png";
import award5 from "@/public/About/award5.png";
import award6 from "@/public/About/award6.png";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRef } from "react";

interface Award {
  id: number;
  image: any;
  alt: string;
}

const awards: Award[] = [
  { id: 1, image: award1, alt: "Award 1" },
  { id: 2, image: award2, alt: "Award 2" },
  { id: 3, image: award3, alt: "Award 3" },
  { id: 4, image: award4, alt: "Award 4" },
  { id: 5, image: award5, alt: "Award 5" },
  { id: 6, image: award6, alt: "Award 6" },
];

export default function AwardsAchievements() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <section className="py-8 bg-white">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
        Our Awards and Achievements
      </h2>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex space-x-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="embla__slide min-w-[calc(100%/2)] sm:min-w-[calc(100%/3)] md:min-w-[calc(100%/4)] lg:min-w-[calc(100%/6)] px-4"
            >
              <div className="rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform h-full">
                <Image
                  src={award.image}
                  alt={award.alt}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
