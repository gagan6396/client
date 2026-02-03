"use client";
import handshakeImage from "@/public/About/handshake.png";
import image4 from "@/public/about_us/3.png";
import image5 from "@/public/about_us/4.png";
import Image from "next/image";
import { Target, Eye, Users, Leaf, Heart, Shield, Sparkles, Star, Award, Globe } from "lucide-react";

export function MissionVision() {
  // Color definitions - Earthy green with brown backgrounds
  const primaryGreen = "#3c4e1b";    // Main earthy green
  const greenLight = "#5a7530";      // Lighter green variant
  const greenDark = "#2a3713";       // Darker green variant
  const warmBrown = "#f8f0e8";       // Warm brown background
  const brownLight = "#f5e8d8";      // Lighter brown background
  const brownMedium = "#e8d8c8";     // Medium brown background
  const greenSubtle = "#f0f5e8";     // Very light green for backgrounds
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5e8d8]">
      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-10">
        {/* Title Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Our <span className="text-[#3c4e1b]">Mission</span> &{" "}
            <span className="text-[#3c4e1b]">Vision</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-md max-w-3xl mx-auto">
            Driving sustainable transformation through community empowerment and heritage preservation
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#3c4e1b] via-[#5a7530] to-[#3c4e1b] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Mission Card */}
          <div className="flex-1 group">
            <div className="bg-gradient-to-br from-white to-[#f8f0e8] rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#3c4e1b]/10 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#3c4e1b]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-[#3c4e1b]/10">
                    <Target className="w-8 h-8 text-[#3c4e1b]" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                      Our Mission
                    </h2>
                    <div className="w-16 h-1 bg-[#3c4e1b] rounded-full mt-2" />
                  </div>
                </div>

                {/* Mission Statement */}
                <p className="text-gray-700 text-md leading-relaxed mb-10 text-center md:text-left">
                  To unite Himalayan farmers under an empowering platform that safeguards 
                  traditional agricultural practices, elevates women's roles, and delivers 
                  wholesome, natural produce for healthier communities and a sustainable future.
                </p>

                {/* Mission Points */}
                <div className="space-y-6">
                  <div className="flex items-start gap-5 p-5 rounded-xl bg-gradient-to-r from-white to-[#f5e8d8] hover:from-[#3c4e1b]/5 hover:to-[#f5e8d8] transition-all duration-300 border border-gray-100 hover:border-[#3c4e1b]/20 group/card">
                    <div className="p-3 rounded-lg bg-[#3c4e1b]/10 group-hover/card:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Users className="w-6 h-6 text-[#3c4e1b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Community Integration
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Uniting farming communities to prevent migration and build resilient agricultural ecosystems.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-5 rounded-xl bg-gradient-to-r from-white to-[#f5e8d8] hover:from-[#3c4e1b]/5 hover:to-[#f5e8d8] transition-all duration-300 border border-gray-100 hover:border-[#3c4e1b]/20 group/card">
                    <div className="p-3 rounded-lg bg-[#3c4e1b]/10 group-hover/card:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Heart className="w-6 h-6 text-[#3c4e1b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Women's Leadership
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Centering women's empowerment through agricultural leadership and economic independence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-5 rounded-xl bg-gradient-to-r from-white to-[#f5e8d8] hover:from-[#3c4e1b]/5 hover:to-[#f5e8d8] transition-all duration-300 border border-gray-100 hover:border-[#3c4e1b]/20 group/card">
                    <div className="p-3 rounded-lg bg-[#3c4e1b]/10 group-hover/card:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Leaf className="w-6 h-6 text-[#3c4e1b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Ecological Stewardship
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Preserving eco-conscious farming traditions to protect biodiversity for future generations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="flex-1 group">
            <div className="bg-gradient-to-br from-white to-[#f8f0e8] rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#3c4e1b]/10 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#3c4e1b]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-[#3c4e1b]/10">
                    <Eye className="w-8 h-8 text-[#3c4e1b]" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                      Our Vision
                    </h2>
                    <div className="w-16 h-1 bg-[#3c4e1b] rounded-full mt-2" />
                  </div>
                </div>

                {/* Vision Statement */}
                <p className="text-gray-700 text-md leading-relaxed mb-10 text-center md:text-left">
                  To cultivate thriving Himalayan communities where empowered women lead sustainable 
                  agriculture, traditional wisdom flourishes, and nature's harmony creates prosperity 
                  for all living beings.
                </p>

                {/* Vision Points */}
                <div className="space-y-6">
                  <div className="flex items-start gap-5 p-5 rounded-xl bg-gradient-to-r from-white to-[#f5e8d8] hover:from-[#3c4e1b]/5 hover:to-[#f5e8d8] transition-all duration-300 border border-gray-100 hover:border-[#3c4e1b]/20 group/card">
                    <div className="p-3 rounded-lg bg-[#3c4e1b]/10 group-hover/card:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-[#3c4e1b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Holistic Development
                      </h3>
                      <p className="text-gray-600 ">
                        Integrated socio-economic advancement in mountainous regions through sustainable practices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-5 rounded-xl bg-gradient-to-r from-white to-[#f5e8d8] hover:from-[#3c4e1b]/5 hover:to-[#f5e8d8] transition-all duration-300 border border-gray-100 hover:border-[#3c4e1b]/20 group/card">
                    <div className="p-3 rounded-lg bg-[#3c4e1b]/10 group-hover/card:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#3c4e1b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Wellness Advocacy
                      </h3>
                      <p className="text-gray-600 ">
                        Championing holistic well-being through organic nutrition and balanced lifestyle choices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-5 rounded-xl bg-gradient-to-r from-white to-[#f5e8d8] hover:from-[#3c4e1b]/5 hover:to-[#f5e8d8] transition-all duration-300 border border-gray-100 hover:border-[#3c4e1b]/20 group/card">
                    <div className="p-3 rounded-lg bg-[#3c4e1b]/10 group-hover/card:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Globe className="w-6 h-6 text-[#3c4e1b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Community Resilience
                      </h3>
                      <p className="text-gray-600 ">
                        Fostering self-sufficient villages with robust social, economic, and environmental foundations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image and Text Sections */}
      <div className="bg-green-100 py-16 sm:py-20 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1: Kids Group */}
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-20 mb-20 md:mb-24 max-w-7xl mx-auto">
            {/* Image Container */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={image4}
                  alt="Group of kids from Uttarakhand communities"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3c4e1b]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#3c4e1b]/10 rounded-full -z-10" />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#3c4e1b]">
                    Uniting Himalayan Communities
                  </h3>
                </div>
                
                <div className="space-y-5">
                  <p className="text-gray-700 text-md leading-relaxed">
                    Gauraaj establishes a supportive network connecting small-scale farmers across 
                    Uttarakhand's hills, safeguarding ancestral farming techniques while creating 
                    sustainable economic pathways.
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed">
                    By linking these agricultural communities to wider markets, we address migration 
                    challenges, reinforce community bonds, and elevate women's participation—ensuring 
                    the Himalayan agricultural legacy endures for generations ahead.
                  </p>
                </div>

                {/* Stats or Features */}
                <div className="grid grid-cols-2 gap-4 ">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-white to-[#f8f0e8] border border-gray-100 shadow-sm hover:border-[#3c4e1b]/30 hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-[#3c4e1b]">500+</div>
                    <div className="text-sm text-gray-600">Agricultural Partners</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-white to-[#f8f0e8] border border-gray-100 shadow-sm hover:border-[#3c4e1b]/30 hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-[#3c4e1b]">50+</div>
                    <div className="text-sm text-gray-600">Community Villages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Women Farmers */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-16 lg:gap-20 max-w-7xl mx-auto">
            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#3c4e1b]">
                    Women's Empowerment Initiative
                  </h3>
                </div>
                
                <div className="space-y-1">
                  <p className="text-gray-700 text-md leading-relaxed">
                    At Gauraaj's core lies our commitment to women's advancement, enabling their 
                    active engagement in organic agriculture and community-building efforts.
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed">
                    We champion the cultivation and distribution of pure, nutritious produce, 
                    encouraging lifestyles that align with natural rhythms while enhancing the 
                    socio-economic fabric of hill communities.
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed">
                    Supporting Gauraaj means participating in a movement dedicated to ecological 
                    balance, gender equity, and the vibrant celebration of Uttarakhand's cultural heritage.
                  </p>
                </div>

                {/* Features List */}
                <div className="">
                  <div className="flex items-center gap-3 group/item cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-[#3c4e1b] group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-gray-700 group-hover/item:text-[#3c4e1b] transition-colors duration-300">Leadership in organic agricultural practices</span>
                  </div>
                  <div className="flex items-center gap-3 group/item cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-[#3c4e1b] group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-gray-700 group-hover/item:text-[#3c4e1b] transition-colors duration-300">Capacity-building and skill enhancement programs</span>
                  </div>
                  <div className="flex items-center gap-3 group/item cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-[#3c4e1b] group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-gray-700 group-hover/item:text-[#3c4e1b] transition-colors duration-300">Creation of sustainable income opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={image5}
                  alt="Group of women farmers from Uttarakhand"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3c4e1b]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#3c4e1b]/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#f8f0e8] to-[#f5e8d8] p-8 rounded-2xl border border-[#3c4e1b]/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-1 bg-[#3c4e1b] rounded-full" />
            <div className="w-12 h-1 bg-[#5a7530] rounded-full" />
            <div className="w-12 h-1 bg-[#3c4e1b] rounded-full" />
          </div>
          <p className="text-gray-700 italic text-lg">
            "Collectively sowing seeds of transformation—nurturing communities, empowering individuals, 
            and safeguarding Earth's natural abundance for tomorrow's generations."
          </p>
        </div>
      </div> */}
    </div>
  );
}