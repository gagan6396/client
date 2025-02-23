"use client";
import Image from "next/image";
import { FC } from "react";

// Images
import storyImage1 from "@/public/l2.jpg";
import storyImage2 from "@/public/l3.jpg";

const AboutHeroSection: FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      {/* "Our Story" Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-10 sm:mb-12 md:mb-16 tracking-tight">
          Our Story
        </h2>

        {/* First Row: Image on the Left, Text on the Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={storyImage1}
              alt="Our Story Image 1"
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          {/* Text */}
          <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Gauraaj, founded on October 2, 2021, by Mrs. Suman Naiwal, emerged as a beacon of hope during the COVID-19 pandemic to support jobless families in Uttarakhand's remote villages. Rooted in the belief of sustainable growth, the initiative aimed to provide a fair and transparent platform for selling authentic Himalayan organic products, ensuring that the benefits of organic farming reached the farmers and communities who needed them the most.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              By leveraging online self-help group meetings, Gauraaj promoted organic farming practices and connected with organic farmers to source premium-quality products directly from the heart of the Himalayas.
            </p>
          </div>
        </div>

        {/* Second Row: Text on the Left, Image on the Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Text */}
          <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6 order-1 md:order-none">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              To create a broader impact, the organization hosted awareness events and campaigns, educating the public about the importance of organic living while building a market for sustainable products. Over time, Gauraaj expanded its mission to champion sustainability, community empowerment, and women's welfare, empowering rural households to build a steady livelihood.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              This journey culminated in its transformation into Gauraaj Valley Food Private Limited on May 3, 2023, further solidifying its commitment to delivering pure, natural, and eco-friendly products. Today, Gauraaj stands as a symbol of purity and resilience, combining traditional Himalayan wisdom with modern sustainable practices to uplift rural livelihoods while offering customers the best of nature's bounty.
            </p>
          </div>
          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={storyImage2}
              alt="Our Story Image 2"
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutHeroSection;