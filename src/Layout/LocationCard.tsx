// components/LocationCard.tsx
"use client";
import shopImage from "@/public/about_us/contact/3.png";
import { MapPin, Star, Navigation, ExternalLink, Clock } from "lucide-react";
import Image from "next/image";

export function LocationCard() {
  const openInGoogleMaps = () => {
    window.open(
      "https://maps.google.com/?q=Gauraj+Valleyfood+Pvt+Ltd+Dehradun",
      "_blank"
    );
  };

  const openDirections = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=Gauraj+Valleyfood+Pvt+Ltd+Dehradun",
      "_blank"
    );
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {/* Left Section: Image with Overlay */}
        <div className="relative group overflow-hidden rounded-xl md:rounded-2xl">
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-full">
            <Image
              src='/down.png'
              alt="Gauraj Valleyfood Pvt. Ltd."
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ae5809] text-[#ae5809]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 ml-1">
                  5.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Details and Map */}
        <div className="space-y-6 sm:space-y-8">
          {/* Title and Description */}
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ae5809]/10 rounded-full mb-3">
                <MapPin className="w-4 h-4 text-[#ae5809]" />
                <span className="text-sm font-semibold text-[#ae5809]">
                  Uttarakhand, India
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Gauraj Valleyfood Pvt. Ltd.
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Opposite Chandrawati Tiwari Public School, Kedarpur, 
                Uttarakhand 248001
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-[#ae5809]" />
                  <span className="text-lg font-bold text-gray-900">5.0</span>
                </div>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#ae5809]" />
                  <span className="text-lg font-bold text-gray-900">10AM-8PM</span>
                </div>
                <p className="text-sm text-gray-600">Business Hours</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openDirections}
              className="flex-1 h-12 bg-[#556b2f] hover:from-[#3c4e1b] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </button>
            <button
              onClick={openInGoogleMaps}
              className="flex-1 h-12 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300  flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ExternalLink className="w-5 h-5" />
              View on Map
            </button>
          </div>

          {/* Map */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Find us here
              </h3>
              <span className="text-sm text-gray-500">
                120+ Reviews
              </span>
            </div>
            
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13783.077170468989!2d78.038018!3d30.272154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909297398515463%3A0xa45c84589925c119!2sGauraaj%20Valleyfood%20Pvt%20Ltd%20%7C%20Organic%20pahadi%20products%20%7C%20Cold%20pressed%20flour%20and%20spices%20%7C%20Dehradun!5e0!3m2!1sen!2sin!4v1745262001771!5m2!1sen!2sin"
                width="100%"
                height="280"
                className="w-full rounded-xl md:rounded-2xl border-0 transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                allowFullScreen
                title="Gauraj Valleyfood Location Map"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Landmark:</span> Opposite Chandrawati Tiwari Public School
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold text-gray-900">Business:</span> Organic pahadi products, Cold pressed flour and spices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}