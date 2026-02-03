"use client";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";

// Placeholder images (replace with actual image paths)
import image4 from "@/public/about_us/5.png";
import image5 from "@/public/about_us/6.png";
import image6 from "@/public/about_us/7.png";
import image7 from "@/public/about_us/8.png";
import image8 from "@/public/about_us/9.png";

const ImpactSection: FC = () => {
  return (
    <div className="bg-gradient-to-b from-white via-[#f5e8d8]/20 to-white py-16 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Impact Section */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3c4e1b] mb-4">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3c4e1b] to-transparent mx-auto mb-6"></div>
            <h3 className="text-xl md:text-2xl text-gray-700 font-light">
              Creating Meaningful Transformation Where It Matters Most
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image4}
                  alt="Our impact at Gauraaj"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="">
            


<div className="grid">
  {[
    "40+ women employed through direct and indirect opportunities",
    "2000+ satisfied customers served across the nation",
    "10+ villages uplifted through ethical sourcing, employment generation, and awareness initiatives",
    "Preservation of traditional, organic Himalayan agricultural practices",
    "Reducing migration by creating sustainable local income sources"
  ].map((item, idx) => (
    <div key={idx} className="flex items-start gap-4 p-2 rounded-xl  transition-all duration-300 ">
      <div className="w-6 h-6 rounded-full bg-[#556b2f] flex items-center justify-center flex-shrink-0 mt-1">
        <Trophy className="w-3 h-3 text-white" />
      </div>
      <span className="text-gray-700 leading-relaxed">{item}</span>
    </div>
  ))}
</div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-[#3c4e1b]/5 to-[#f8f0e8] rounded-xl border-l-4 border-[#3c4e1b]">
                <p className="text-gray-800 text-lg font-medium italic">
                  When you choose Gauraaj, you're supporting local communities and building sustainable futures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Women Empowerment at Gauraaj Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3c4e1b] mb-4">
              Women Empowerment at Gauraaj
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3c4e1b] to-transparent mx-auto mb-6"></div>
            <h3 className="text-xl md:text-2xl text-gray-700 font-light">
              Skilled Artisans Cultivating Change Through Traditional Expertise
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5a7530] to-[#3c4e1b] rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image5}
                  alt="Women working at Gauraaj"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="md:order-1">
              <p className="text-gray-700 text-lg leading-relaxed">
                Every package of flour, spice, hand-ground salt, and product embodies the dedication of rural women who meticulously process each item with traditional expertise and ancestral wisdom.
              </p>
              
              <div className="my-4">
                {[
                  "Returned from urban migration to build livelihoods in their hometowns",
                  "Manage the entire process from harvesting to careful packaging",
                  "Serve as community leaders and catalysts for positive change"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4  rounded-xl transition-all duration-300 hover:shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#3c4e1b] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed pt-4">
                Their resilience, craftsmanship, and spirit resonate in every product you experience.
              </p>
            </div>
          </div>
        </section>

        {/* Community Initiatives Section */}
        <section className="mb-24 ">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3c4e1b] mb-4">
              Community Initiatives
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3c4e1b] to-transparent mx-auto mb-6"></div>
            <h3 className="text-xl md:text-xl text-gray-700 font-light">
              Social Responsibility is Our Foundation, Not an Add-on
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image6}
                  alt="Community initiatives at Gauraaj"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="">
              <p className="text-gray-700 text-lg leading-relaxed">
                Gauraaj operates continuous community development programs to strengthen the social fabric of rural Uttarakhand:
              </p>
              
              <div className="grid">
                {[
                  "300 km Millet Awareness Cycling Expedition – Dehradun to Chamoli",
                  "Hunar Haat – Showcasing and supporting women artisans and food producers",
                  "Vocational training programs – Plumbing, painting, and sustainable trades",
                  "Health awareness campaigns – Mental, menstrual & physical wellness",
                  "Essential resource distributions to families requiring assistance"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-2 rounded-xl  transition-all duration-300 hover:shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#3c4e1b] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              
              {/* <div className="mt-8 p-6 bg-gradient-to-br from-[#3c4e1b]/5 to-[#f8f0e8] rounded-2xl border border-[#3c4e1b]/20">
                <h4 className="font-semibold text-[#3c4e1b] text-lg mb-3">
                  The Model Village Initiative
                </h4>
                <p className="text-gray-700 leading-relaxed text-md">
                  At Gauraaj, we've transformed Chauki village into a living model that embodies our vision for sustainable Himalayan living. Through immersive workshops, we engage students, residents, and visitors in exploring organic farming, eco-friendly architecture, Himalayan livelihoods, and the intrinsic value of naturally cultivated food.
                </p>
              </div> */}
            </div>
          </div>
        </section>

        {/* Why Gauraaj Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3c4e1b] mb-4">
              Why Choose Gauraaj?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3c4e1b] to-transparent mx-auto mb-6"></div>
            <h3 className="text-xl md:text-xl text-gray-700 font-light">
              Beyond Organic — Soulful, Sustainable, and Socially Conscious
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5a7530] to-[#3c4e1b] rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image7}
                  alt="Why choose Gauraaj"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="md:order-1 space-y-2">
              <div className="space-y-2">
                <div className="p-3 bg-gradient-to-br from-white to-[#f8f0e8] rounded-2xl border border-[#3c4e1b]/20 hover:border-[#3c4e1b]/40 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-[#3c4e1b] text-lg mb-3">
                    Himalayan Origins & Natural Nurturing
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Cultivated in pristine Himalayan terrain, nourished by pure air and water, our offerings transcend conventional organic standards in both nutritional value and purity.
                  </p>
                </div>
                
                <div className="p-3 bg-gradient-to-br from-white to-[#f8f0e8] rounded-2xl border border-[#3c4e1b]/20 hover:border-[#3c4e1b]/40 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-[#3c4e1b] text-lg mb-3">
                    Driven by Purpose
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Since inception, Gauraaj has focused on reversing migration patterns, generating women's employment opportunities, and revitalizing traditional agricultural heritage.
                  </p>
                </div>
                
                <div className="p-3 bg-gradient-to-br from-white to-[#f8f0e8] rounded-2xl border border-[#3c4e1b]/20 hover:border-[#3c4e1b]/40 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-[#3c4e1b] text-lg mb-3">
                    Authentically Natural
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    We employ no synthetic chemicals, artificial preservatives, or shortcuts. Our cold-pressed flours, stone-ground spices, Buransh teas, and all products are handcrafted with care and legacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discover Our Organic Collection Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3c4e1b] mb-4">
              Explore Our Organic Selection
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3c4e1b] to-transparent mx-auto mb-6"></div>
            <h3 className="text-xl md:text-xl text-gray-700 font-light">
              Pure, Nourishing Himalayan Essence
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src='/inside.png'
                  alt="Gauraaj organic products"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 text-md leading-relaxed">
                Experience the authentic, nourishing essence of the Himalayas with Gauraaj's carefully curated selection of cold-pressed flours, stone-ground spices, buransh tea, hand-ground salts, and other traditional products. Cultivated in rich mountain soil and processed using time-honored methods, each product represents a step toward healthier living and conscious consumption.
              </p>
              
              <p className="text-gray-700 text-md leading-relaxed">
                Bring home genuine quality, holistic wellness, and the authentic spirit of Uttarakhand — all thoughtfully combined.
              </p>
              
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-[#3c4e1b] to-[#5a7530] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Shop Now and Bring Home Himalayan Purity
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImpactSection;