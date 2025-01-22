"use client"
import target1 from "@/public/About/target1.png";
import target2 from "@/public/About/target2.png";
import target3 from "@/public/About/target3.png";
import target4 from "@/public/l1.jpg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRef } from "react";

export function TeamAndTargets() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // Adjust delay as needed
  );
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  const targets = [
    {
      image: target1,
      title: "A Halt to Migration",
      description:
        "We aim to curb the migration from Uttarakhand’s hills by creating sustainable livelihoods. By connecting small farmers to larger markets, we help them thrive in their homeland, preserving the cultural and social fabric of these vibrant communities.",
    },
    {
      image: target2,
      title: "Women's Empowerment",
      description:
        "Empowering women is at the heart of Gauraj’s mission. We provide opportunities for women to actively participate in every stage of our operations, enhancing their social and economic status and building stronger, self-reliant communities.",
    },
    {
      image: target3,
      title: "Healthy Eating, Healthy Living",
      description:
        "Our commitment to health is unwavering. We promote natural, organic farming practices that deliver fresh, wholesome produce. By choosing Gauraj, you’re not only nourishing your body but supporting a lifestyle that respects nature and values well-being.",
    },
    {
      image: target4,
      title: "Preserving Traditions",
      description:
        "Through our efforts, we work to preserve the traditions, culture, and practices of the region while introducing innovative solutions for sustainable growth.",
    },
  ];

  return (
    <div className="bg-white py-12 px-6">
      <div className="container mx-auto space-y-12">
        {/* Our Targets Section */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl font-bold text-green-800">Our Targets</h2>
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-3">
              {targets.map((target, index) => (
                <div
                  key={index}
                  className="embla__slide min-w-[calc(100%/1.25)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/4)] px-4"
                >
                  <div className="rounded-lg shadow-lg bg-gray-50 p-4 h-full">
                    <Image
                      src={target.image}
                      alt={target.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <h3 className="text-base font-semibold text-green-800">
                        {target.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{target.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
