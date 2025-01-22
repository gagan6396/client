"use client";

import arsa from "@/public/arsa.jpg";
import buransh from "@/public/buransh-tea.jpg";
import chamomile from "@/public/chamomile-tea.jpg";
import ghee from "@/public/ghee.jpg";
import gujiye from "@/public/gujiye.jpg";
import honey from "@/public/honey.jpg";
import millet from "@/public/millet.png";
import spices from "@/public/spices.png";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Cold Pressed Atta", image: millet },
  { name: "Ghee & Oils", image: ghee },
  { name: "Gift Hampers", image: gujiye },
  { name: "Hand Grounded Products", image: arsa },
  { name: "Herbal Tea", image: chamomile },
  { name: "Honey", image: honey },
  { name: "Offer", image: buransh },
  { name: "Pulses", image: millet },
  { name: "Rice & Millets", image: millet },
  { name: "Seeds & Condiments", image: spices },
  { name: "Spices", image: spices },
  { name: "Sweetner", image: honey },
];

const CategoriesPage = () => {
  return (
    <section className="container mx-auto px-5 py-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12">
        Explore Our Categories
      </h1>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4"
          >
            {/* Image Section */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>

            {/* Information Section */}
            <div className="ml-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
              <Link
                href={`/categories/${category.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                className="text-green-600 text-sm md:text-base font-medium mt-2 hover:underline"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
