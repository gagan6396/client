// components/LocationCard.tsx
import shopImage from "@/public/l10.jpg";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function LocationCard() {
  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Image */}
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={shopImage}
            alt="Gauraj Valleyfood Pvt. Ltd."
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Details and Map */}
        <div className="space-y-6">
          {/* Title and Description */}
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-2">
              Gauraj Valleyfood Pvt. Ltd.
            </h2>
            <p className="text-gray-600 text-lg">
              Opposite Chandrawati Tiwari Public School, Kedarpur, Uttarakhand
              248001
            </p>
          </div>

          {/* Map and Reviews */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-6 h-6 text-green-700" />
              <span className="text-lg font-medium">5.0 ⭐ (110 Reviews)</span>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.4230835878465!2d77.98961697519316!3d30.33714851173571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909297ad91e1df1%3A0x9a67c26e0b63e50a!2sGauraj%20Valleyfood%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1682569908804!5m2!1sen!2sin"
                width="100%"
                height="400"
                loading="lazy"
                className="rounded-lg border"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
