import Image from "next/image";
import award1 from "@/public/About/award1.png";
import award2 from "@/public/About/award2.png";
import award3 from "@/public/About/award3.png";
import award4 from "@/public/About/award4.png";
import award5 from "@/public/About/award5.png";
import award6 from "@/public/About/award6.png";

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
    <section className="py-8 bg-white">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
        Our Awards and Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16">
        {awards.map((award) => (
          <div
            key={award.id}
            className="rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={award.image}
              alt={award.alt}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
