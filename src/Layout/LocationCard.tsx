// components/LocationCard.tsx
"use client";
import shopImage from "@/public/l10.jpg";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function LocationCard() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Section: Image */}
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={shopImage}
            alt="Gauraj Valleyfood Pvt. Ltd."
            width={600}
            height={400}
            className="w-full h-64 sm:h-80 md:h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Right Section: Details and Map */}
        <div className="space-y-4 sm:space-y-6">
          {/* Title and Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-600 mb-2 md:mb-4 tracking-tight">
              Gauraj Valleyfood Pvt. Ltd.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Opposite Chandrawati Tiwari Public School, Kedarpur, Uttarakhand 248001
            </p>
          </div>

          {/* Map and Reviews */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600 flex-shrink-0" />
              <span className="text-sm sm:text-base md:text-lg font-medium">
                5.0 ⭐ (110 Reviews)
              </span>
            </div>

            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.4230835878465!2d77.98961697519316!3d30.33714851173571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909297ad91e1df1%3A0x9a67c26e0b63e50a!2sGauraj%20Valleyfood%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1682569908804!5m2!1sen!2sin"
                width="100%"
                height="300"
                className="sm:h-350 md:h-400 w-full rounded-xl md:rounded-2xl border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}