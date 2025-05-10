"use client";
import Image from "next/image";
import { FC } from "react";

// Images
import storyImage1 from "@/public/about_us/1.png";
import storyImage2 from "@/public/about_us/3.png";

const AboutHeroSection: FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      {/* "Our Story" Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#7A6E18] mb-10 sm:mb-12 md:mb-16 tracking-tight">
          Our Story
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
          From Crisis to Creation: A Journey of Empowerment
        </h3>

        {/* First Row: Image on the Left, Text on the Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Image */}
          <div className=" flex justify-center order-1 md:order-none">
            <div className="relative h-64 sm:h-80 md:h-96 aspect-square rounded-xl md:rounded-2xl overflow-hidden">
              <Image
                src={storyImage1}
                alt="Our Story Image 1"
                // layout="fill"
                // objectFit="contain"
                className="w-full h-full transition-transform duration-500 hover:scale-105 object-cover rounded-2xl"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" /> */}
            </div>
          </div>
          {/* Text */}
          <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Founded on October 2, 2021, by Mrs. Suman Nainwal during the
              challenging COVID-19 pandemic, Gauraaj began as a beacon of hope
              for jobless families in the remote Himalayan villages of
              Uttarakhand. What started as an initiative to help families
              survive quickly grew into a vision for sustainable livelihood,
              women empowerment, and organic farming revival.
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
              <li>
                We hosted virtual Self-Help Group sessions to encourage organic
                practices
              </li>
              <li>
                Connected with local farmers to source pure, Himalayan-grown
                produce
              </li>
              <li>
                Ran awareness campaigns to promote natural living and
                sustainability
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row: Text on the Left, Image on the Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Text */}
          <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6 order-1 md:order-none">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              On May 3, 2023, Gauraaj transitioned into Gauraaj Valleyfood Pvt
              Ltd, expanding its reach while staying rooted in its mission — to
              deliver eco-friendly, traditional, and healing products that
              nourish people and protect the planet.
            </p>
          </div>
          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden">
            <Image
              src={storyImage2}
              alt="Our Story Image 2"
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutHeroSection;
