"use client";
import award1 from "@/public/awards/1.png";
import award2 from "@/public/awards/2.png";
import award3 from "@/public/awards/3.png";
import award4 from "@/public/awards/4.png";
import award5 from "@/public/awards/5.png";
import award6 from "@/public/awards/6.png";
import Image from "next/image";

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
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      {/* Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7A6E18] mb-10 sm:mb-12 md:mb-16 tracking-tight">
        Our Awards & Achievements
      </h2>

      {/* Awards Grid */}
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {awards.map((award) => (
          <div
            key={award.id}
            className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 overflow-hidden"
          >
            <div className="aspect-[16/9] w-full">
              <Image
                src={award.image}
                alt={award.alt}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
