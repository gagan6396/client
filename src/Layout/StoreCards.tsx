"use client";
import { FC } from "react";

interface StoreInfo {
  title: string;
  address: string;
  timings: string;
  delivery: string;
}

const stores: StoreInfo[] = [
  {
    title: "Rajpur Road",
    address: "THE PMFME STORE, Opp Gandhi Park, Rajpur Road, Dehradun",
    timings: "6:00–21:30",
    delivery: "10:00 – 17:00",
  },
  {
    title: "Race Course",
    address: "Grocery for U, Suri Chowk, Race Course, Dehradun",
    timings: "7:00–22:00",
    delivery: "10:00 – 17:00",
  },
  {
    title: "Banjarawala",
    address: "Vega Superstore Near Siddheshwar Temple, Bajaraawala, Dehradun",
    timings: "7:00–23:00",
    delivery: "10:00 – 17:00",
  },
  {
    title: "Kedarpuram",
    address: "Gauraraj Pahadi Fasal Ewam Hastshilp, New Mothorowal Road, Dehradun",
    timings: "9:30–19:30",
    delivery: "10:00 – 17:00",
  },
];

const StoreCards: FC = () => {
  return (
    <div className="mt-10 sm:mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-white to-gray-50">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-600 mb-8 md:mb-12 text-center tracking-tight">
        Find Our Local Stores
      </h2>

      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {stores.map((store, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-600 mb-3 md:mb-4 group-hover:text-green-700 transition-colors duration-300">
              {store.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
              {store.address}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <strong className="font-medium">Hours:</strong> {store.timings}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <strong className="font-medium">Delivery:</strong> {store.delivery}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCards;