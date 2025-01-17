// components/LocationCard.tsx
import React from "react";
import Image from "next/image";
import shopImage from "@/public/shop.png";

import { MapPin } from "lucide-react";

export function LocationCard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-lg shadow-lg">
      {/* Left Section: Image */}
      <div className="lg:w-1/2">
        <Image
          src={shopImage}
          alt="Gauraj Valleyfood Pvt. Ltd."
          width={500}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Right Section: Details and Map */}
      <div className="lg:w-1/2 space-y-4">
        {/* Title and Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-700">
            Gauraj Valleyfood Pvt. Ltd.
          </h2>
          <p className="text-gray-600">
            Opposite Chandrawati Tiwari Public School, Kedarpur, Uttarakhand
            248001
          </p>
        </div>

        {/* Map and Reviews */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-green-700" />
            <span>5.0 ⭐ (110 Reviews)</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.4230835878465!2d77.98961697519316!3d30.33714851173571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909297ad91e1df1%3A0x9a67c26e0b63e50a!2sGauraj%20Valleyfood%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1682569908804!5m2!1sen!2sin"
            width="100%"
            height="200"
            loading="lazy"
            className="rounded-lg border"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
