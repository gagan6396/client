import Image from "next/image";
import { FC } from "react";

// Images
import storyImage1 from "@/public/l2.jpg";
import storyImage2 from "@/public/l3.jpg";
import slider1 from "@/public/l4.jpg";

const AboutHeroSection: FC = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="text-center py-12 bg-white h-screen"
        style={{
          backgroundImage: `url(${slider1.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">
          About Gauraaj: Rooted in Sustainability, Growing with Purpose
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          &quot;Discover Our Journey of Empowering Communities and Delivering
          Pure, Organic Products from the Heart of Nature.&quot;
        </p>
      </section>

      {/* "Our Story" Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700">
            Our Story
          </h2>

          {/* First Row: Image on the Left, Text on the Right */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative w-full">
              <Image
                src={storyImage1}
                alt="Our Story Image 1"
                className="object-cover"
              />
            </div>
            {/* Text */}
            <div className="text-gray-700 space-y-4">
              <p>
                Gauraaj, founded on October 2, 2021, by Mrs. Suman Naiwal,
                emerged as a beacon of hope during the COVID-19 pandemic to
                support jobless families in Uttarakhand&apos;s remote villages.
                Rooted in the belief of sustainable growth, the initiative aimed
                to provide a fair and transparent platform for selling authentic
                Himalayan organic products, ensuring that the benefits of
                organic farming reached the farmers and communities who needed
                them the most.
              </p>
              <p>
                By leveraging online self-help group meetings, Gauraaj promoted
                organic farming practices and connected with organic farmers to
                source premium-quality products directly from the heart of the
                Himalayas.
              </p>
            </div>
          </div>

          {/* Second Row: Image on the Left, Text on the Right */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative w-full h-64 md:order-1">
              <Image
                src={storyImage2}
                alt="Our Story Image 2"
                className="object-cover"
                layout="fill"
              />
            </div>
            {/* Text */}
            <div className="text-gray-700 space-y-4">
              <p>
                To create a broader impact, the organization hosted awareness
                events and campaigns, educating the public about the importance
                of organic living while building a market for sustainable
                products. Over time, Gauraaj expanded its mission to champion
                sustainability, community empowerment, and women&apos;s welfare,
                empowering rural households to build a steady livelihood.
              </p>
              <p>
                This journey culminated in its transformation into Gauraaj
                Valley Food Private Limited on May 3, 2023, further solidifying
                its commitment to delivering pure, natural, and eco-friendly
                products. Today, Gauraaj stands as a symbol of purity and
                resilience, combining traditional Himalayan wisdom with modern
                sustainable practices to uplift rural livelihoods while offering
                customers the best of nature&apos;s bounty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutHeroSection;
