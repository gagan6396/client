"use client";
import handshakeImage from "@/public/About/handshake.png";
import image4 from "@/public/about_us/4.png";
import image5 from "@/public/about_us/5.png";
import Image from "next/image";

export function MissionVision() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7A6E18] tracking-tight">
            Our Mission & Vision
          </h1>
        </div>

        {/* Mission and Vision Cards */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
          {/* Mission */}
          <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#7A6E18] text-center mb-4 md:mb-6 tracking-tight">
              Our Mission
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              To connect small farmers from Uttarakhand’s hills under one nurturing platform, preserving traditional farming, empowering women, and promoting healthy, pure, and natural produce for a better tomorrow.
            </p>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start bg-[#7A6E18]/10 p-4 rounded-lg shadow-sm hover:bg-[#7A6E18]/20 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#7A6E18]">
                    Connecting Communities
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Support farmers, stop migration.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-[#7A6E18]/10 p-4 rounded-lg shadow-sm hover:bg-[#7A6E18]/20 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#7A6E18]">
                    Empowerment Focus
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Women at the heart of our mission.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-[#7A6E18]/10 p-4 rounded-lg shadow-sm hover:bg-[#7A6E18]/20 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#7A6E18]">
                    Sustainability Commitment
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Preserve eco-friendly farming values.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#7A6E18] text-center mb-4 md:mb-6 tracking-tight">
              Our Vision
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              To transform lives by nurturing hill communities, empowering women, and celebrating Uttarakhand&apos;s rich agricultural heritage, fostering a future where nature and people thrive together.
            </p>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start bg-[#7A6E18]/10 p-4 rounded-lg shadow-sm hover:bg-[#7A6E18]/20 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#7A6E18]">
                    Holistic Growth
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Socio-economic progress in hilly regions.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-[#7A6E18]/10 p-4 rounded-lg shadow-sm hover:bg-[#7A6E18]/20 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#7A6E18]">
                    Healthy Living
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Advocate wellness through natural food.
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-[#7A6E18]/10 p-4 rounded-lg shadow-sm hover:bg-[#7A6E18]/20 transition-colors duration-300">
                <Image
                  src={handshakeImage}
                  alt="Handshake Icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#7A6E18]">
                    Community Strength
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Empowered, self-sustaining villages.
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
              src={image4}
              alt="Group of kids"
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="w-full lg:w-1/2 text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Gauraaj is dedicated to uniting small farmers from Uttarakhand’s hills under a nurturing platform, preserving traditional farming methods, and promoting sustainable livelihoods. By connecting these farmers to broader markets, we aim to curb migration, strengthen communities, and empower women, ensuring the rich agricultural heritage of the Himalayas thrives for generations to come.
            </p>
          </div>
        </div>

        {/* Section 2: Women Farmers */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 text-gray-700 space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Our mission at Gauraaj places women at the forefront, empowering them through active participation in organic farming and community initiatives. We strive to promote healthy, pure, and natural produce, fostering a lifestyle that harmonizes with nature while uplifting the socio-economic status of hill communities. Choosing Gauraaj means supporting a movement for sustainability, empowerment, and the celebration of Uttarakhand’s vibrant culture.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image5}
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