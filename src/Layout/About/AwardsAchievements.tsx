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
    <section className="py-16 md:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#556b2f] mb-4">
            Our Awards & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ab5a08] to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 font-light max-w-2xl mx-auto">
            Recognition for our commitment to quality, sustainability, and social impact
          </p>
        </div>
        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {awards.map((award) => (
            <div
              key={award.id}
              className="group relative"
            >
              <div className="relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-[4/3] w-full relative">
                  <Image
                    src={award.image}
                    alt={award.alt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom Message */}
        {/* <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Each recognition reflects our unwavering dedication to bringing authentic Himalayan products to your table while uplifting rural communities.
          </p>
        </div> */}
      </div>
    </section>
  );
}