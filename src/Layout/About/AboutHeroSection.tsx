"use client";
import Image from "next/image";
import { FC } from "react";

// Images
import storyImage1 from "@/public/about_us/owner.jpeg";
import storyImage2 from "@/public/about_us/9.png";

const AboutHeroSection: FC = () => {
  return (
    <div
      className="relative padd overflow-hidden bg-gradient-to-b from-white via-amber-50/20 to-white min-h-screen"
      style={{ marginTop: "53px" }}
    >
      {/* Banner Image Section - Clean version without gradients */}
      <div className="relative w-full h-full min-h-[400px] max-h-[500px] overflow-hidden">
        <Image
          src="/ABOUT US (2).webp" // Direct path from public folder
          alt="About Us Banner - Gauraaj Journey"
          fill

          className="object-contain md:object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light">
              From Himalayan Roots to Global Impact
            </p>
          </div>
        </div> */}
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#556b2f]">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3c4e1b] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light">
            From Adversity to Innovation: Empowering Communities Through Sustainable Living
          </p>
        </div>

        {/* SECTION 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          {/* Image */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src={storyImage1}
                  alt="Gauraaj founding story during COVID-19 pandemic"
                  fill
                  className="object-cover hei transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 ">
            <h3 className="text-3xl md:text-4xl font-bold text-[#556b2f]">
              The Origin
            </h3>

            <p className="text-gray-700 leading-relaxed text-md">
              Born amidst the global uncertainty of the COVID-19 pandemic, Gauraaj emerged as a visionary initiative by Mrs. Suman Nainwal. It started as a lifeline for families facing unemployment in the secluded Himalayan communities of Uttarakhand. Drawing on local resources and traditional knowledge, the initiative created sustainable livelihoods while preserving the region's cultural heritage. What began as crisis-driven support soon evolved into a long-term mission of empowerment and self-reliance.
            </p>

            <div className="">
              {[
                "Organized digital self-help circles to champion organic cultivation methods",
                "Forged partnerships with indigenous farmers for authentic Himalayan harvests",
                "Launched educational initiatives advocating natural lifestyles and ecological balance"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl bg-white/80 transition-all duration-300 hover:bg-white/90">
                  <div className="w-2 h-2 rounded-full bg-[#3c4e1b] mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div className="space-y-6 md:order-1 order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#556b2f]">
              The Transformation
            </h3>

            <p className="text-gray-700 leading-relaxed text-md">
              On May 3, 2023, Gauraaj reached a pivotal moment by evolving into Gauraaj Valleyfood Pvt. Ltd. This strategic transformation marked our expanding vision while staying rooted in our foundational principles.
            </p>

            <p className="text-gray-700 leading-relaxed text-md">
              As a registered entity, we've deepened our dedication to producing environmentally conscious, traditionally inspired, and wellness-oriented offerings. Gauraaj Valleyfood seamlessly merges ancestral knowledge with thoughtful innovation, ensuring each product contributes to sustainable ecosystems, comprehensive well-being, and lasting environmental stewardship.
            </p>

            <div className="mt-8 p-6 bg-gradient-to-r from-[#3c4e1b]/5 to-transparent rounded-xl border-l-4 border-[#3c4e1b]">
              <p className="text-gray-700 font-medium">
                Ecological Stewardship • Community Upliftment • Organic Integrity • Heritage Preservation
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative group md:order-2 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src='/inside.png'
                  alt="Gauraaj Valleyfood Pvt Ltd corporate evolution"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        {/* <div className="text-center mt-20">
          <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#3c4e1b]/5 to-[#e8eed8]/50 border border-[#3c4e1b]/20">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Enduring Mission
            </h4>
            <p className="text-gray-700 text-lg leading-relaxed">
              Delivering the pristine essence of the Himalayas to households nationwide while strengthening rural economies and safeguarding time-honored agricultural heritage for generations to come.
            </p>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default AboutHeroSection;