"use client";
import handshakeImage from "@/public/About/handshake.png";
import kidsGroup from "@/public/l10.jpg";
import womenFarmers from "@/public/l9.jpg";
import Image from "next/image";

export function MissionVision() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-600 tracking-tight">
            Our Mission & Vision
          </h1>
        </div>

        {/* Mission and Vision Cards */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
          {/* Mission */}
          <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 text-center mb-4 md:mb-6 tracking-tight">
              Our Mission
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              To connect small farmers from Uttarakhand’s hills under one nurturing platform, preserving traditional farming, empowering women, and promoting healthy, pure, and natural produce for a better tomorrow.
            </p>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm hover:bg-green-100 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">
                    Connecting Communities
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Support local farmers and prevent migration.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm hover:bg-green-100 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">
                    Empowerment Focus
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Enable women to lead and thrive.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm hover:bg-green-100 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">
                    Sustainability Commitment
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Advocate for eco-friendly and healthy farming practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 text-center mb-4 md:mb-6 tracking-tight">
              Our Vision
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              To transform lives by nurturing hill communities, empowering women, and celebrating Uttarakhand&apos;s rich agricultural heritage, fostering a future where nature and people thrive together.
            </p>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm hover:bg-green-100 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">
                    Holistic Growth
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Foster socio-economic growth in hill regions.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm hover:bg-green-100 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">
                    Healthy Living
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Promote a culture of health and well-being through natural products.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm hover:bg-green-100 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">
                    Community Strength
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Build empowered and self-reliant communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image and Text Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-white">
        {/* Section 1: Kids Group */}
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={kidsGroup}
              alt="Group of kids"
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="w-full lg:w-1/2 text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Gauraj is dedicated to bringing the pure, natural bounty of Uttarakhand’s hills to consumers while supporting the resilient farmers who cultivate it. Nestled in the heart of the enchanting mountains, we aim to create sustainable livelihoods that keep families together and preserve the vibrant hill culture. Migration to far-off cities has long disrupted these communities, but Gauraj stands as a pledge to reverse this trend by connecting small farmers to markets and fostering economic stability. Led by a passionate team of women, we champion empowerment, sustainability, and the celebration of the Himalayan way of life, making Gauraj more than a venture—it’s a movement for meaningful change.
            </p>
          </div>
        </div>

        {/* Section 2: Women Farmers */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              At Gauraj, we strive to empower women by integrating them into every aspect of our operations, helping elevate their social and economic status. From cultivating organic produce to preserving it and promoting healthy living, we believe that empowered women are the backbone of empowered communities. Our mission transcends food production—we foster a lifestyle rooted in health, well-being, and harmony with nature. Every product we deliver reflects our respect for the environment and commitment to quality. By choosing Gauraj, you are not only opting for fresh, natural produce but also contributing to a movement that uplifts hill communities, nurtures dreams, and celebrates the rich culture and resilience of Uttarakhand.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={womenFarmers}
              alt="Group of women farmers"
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}