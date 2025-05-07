"use client";
import { Button } from "@/components/ui/button";
import organicImage from "@/public/l9.jpg";
import Image from "next/image";

export function OrganicCollection() {
  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="text-center md:text-left space-y-4 sm:space-y-6 md:space-y-8 max-w-lg mx-auto md:mx-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7A6E18] leading-tight tracking-tight">
            Discover Our Organic Collection
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Seeking healthy, chemical-free goodness? Gauraaj’s organic collection brings you nature’s finest—curated for cooking, skincare, and wellness. Experience the pure, authentic difference in every product, handpicked to elevate your daily life. Dive in and taste the essence of sustainability today!
          </p>
          <Button
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-[#7A6E18] hover:bg-[#7A6E18] text-white text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-500"
            onClick={() => window.location.href = "/products"} // Adjust navigation as needed
          >
            Shop Now
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={organicImage}
            alt="Browse Our Organic Collection"
            layout="fill"
            objectFit="cover"
            className="w-full h-full transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}

export default OrganicCollection;