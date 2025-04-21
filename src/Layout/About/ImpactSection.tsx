"use client";
import Image from "next/image";
import { FC } from "react";

// Placeholder images (replace with actual image paths)
import communityEvent from "@/public/event.jpg";
import impactImage from "@/public/l4.jpg"; // New placeholder for "Our Impact"
import whyGauraajImage from "@/public/l6.jpg"; // New placeholder for "Why Gauraaj"
import organicProducts from "@/public/organic-foof.jpg";
import womenWorking from "@/public/women-working.jpg";
import Link from "next/link";

const ImpactSection: FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Impact Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4 tracking-tight">
            Our Impact
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
            Creating Real Change Where It Matters Most
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={impactImage}
                alt="Our impact at Gauraaj"
                layout="fill"
                objectFit="cover"
                className="w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>40+ women employed, directly and indirectly</li>
                <li>2000+ happy customers across India</li>
                <li>10+ villages uplifted through sourcing, employment & awareness</li>
                <li>Promoting traditional, organic, Himalayan agriculture</li>
                <li>Working to stop migration by building income at home</li>
              </ul>
              <p className="font-semibold">
                When you support Gauraaj, you’re buying local and building lives.
              </p>
            </div>
          </div>
        </section>

        {/* Hands Behind Gauraaj Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4 tracking-tight">
            Hands Behind Gauraaj
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
            The Women Who Grow, Create, and Lead
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={womenWorking}
                alt="Women working at Gauraaj"
                layout="fill"
                objectFit="cover" // Changed to cover for consistency
                className="w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Behind every pack of flour, spice, hand-ground salt, and other products lies the effort of dedicated rural women who hand-process each item with care and ancestral wisdom.
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
                <li>Are returnees from urban migration, now earning in their hometowns</li>
                <li>Handle everything from harvesting to packaging</li>
                <li>Are not just workers, but leaders of change in their communities</li>
              </ul>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Their strength, skill, and soul shine through in every product you hold.
              </p>
            </div>
          </div>
        </section>

        {/* Community Initiatives Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4 tracking-tight">
            Community Initiatives
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
            Social Work is Our Backbone, Not a Side Project
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6 order-1 md:order-none">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Gauraaj runs ongoing community-building programs to strengthen the social fabric of rural Uttarakhand:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
                <li>300 km Millet Awareness Cycle Rally – Dehradun to Chamoli</li>
                <li>Hunar Haat – Promoting women artisans and food producers</li>
                <li>Skill development programs – Plumbing, painting, and trades</li>
                <li>Health awareness drives – Mental, menstrual & physical well-being</li>
                <li>Shelter material donations to families in need</li>
                <li>
                  <strong>The Experimental Model Village Initiative</strong> – At Gauraaj, we’ve developed village Chauki as a model village that reflects our vision of sustainable living in the Himalayas. Through hands-on workshops, we engage students, locals, and visitors in topics like organic farming, sustainable architecture, Himalayan livelihoods, and the value of naturally grown food.
                </li>
              </ul>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                This initiative supports reverse migration, promotes eco-conscious learning, and builds a replicable model for vibrant rural development. Each initiative empowers rural lives, builds pride, and sustains traditions.
              </p>
            </div>
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={communityEvent}
                alt="Community initiatives at Gauraaj"
                layout="fill"
                objectFit="cover"
                className="w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </section>

        {/* Why Gauraaj Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4 tracking-tight">
            Why Gauraaj?
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
            Because It’s More Than Organic — It’s Soulful, Sustainable, and Social
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={whyGauraajImage}
                alt="Why choose Gauraaj"
                layout="fill"
                objectFit="cover"
                className="w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-900 mb-2">
                  Himalayan Born & Nature Nurtured
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  Grown in pristine Himalayan soil, nurtured by pure air and water, our products are beyond organic in both nutrition and purity.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-900 mb-2">
                  Powered by Purpose
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  From day one, Gauraaj has worked to reverse migration, create women’s employment, and revive forgotten traditional farming.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-900 mb-2">
                  Naturally Honest
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  We use no chemicals, preservatives, or shortcuts. Our cold-pressed flours, stone-ground spices, Buransh teas, and all products are handmade with love and legacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Discover Our Organic Collection Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4 tracking-tight">
            Discover Our Organic Collection
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
            Pure, Nourishing Essence of the Himalayas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Experience the pure, nourishing essence of the Himalayas with Gauraaj’s handpicked selection of cold-pressed flours, stone-ground spices, buransh tea, hand-ground salts, and all other products. Grown in rich mountain soil and processed with traditional methods, every product is a step toward healthier living and conscious choices.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Bring home authenticity, wellness, and the soul of Uttarakhand — all in one basket.
              </p>
              <Link
                href="/products"
                className="inline-block bg-green-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full hover:bg-green-700 transition-colors duration-300"
              >
                Shop now and bring home the purity of the Himalayas
              </Link>
            </div>
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={organicProducts}
                alt="Gauraaj organic products"
                layout="fill"
                objectFit="cover"
                className="w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImpactSection;