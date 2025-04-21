"use client";
import { Button } from "@/components/ui/button"; // Assuming you&apos;re using shadcn/ui Button
import ContactUsImg from "@/public/moutain.jpg";
import Image from "next/image";

export function ContactCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6 sm:p-8 md:p-10 bg-white rounded-xl sm:rounded-2xl transition-all duration-300 border border-gray-100">
      {/* Left Section: Image */}
      <div className="w-full md:w-1/2 relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg md:rounded-xl">
        <Image
          src={ContactUsImg}
          alt="Gauraj Valleyfood Pvt. Ltd."
          layout="fill"
          objectFit="contain"
          className="w-full h-full transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Right Section: Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
          &quot;Have questions or need support? Reach out today and let’s grow
          something amazing together!&quot;
        </p>
        <Button
          className="mt-2 sm:mt-4 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-500"
          onClick={() => (window.location.href = "/contact")} // Adjust navigation as needed
        >
          Contact Now
        </Button>
      </div>
    </div>
  );
}
