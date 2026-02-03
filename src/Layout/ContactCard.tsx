"use client";
import { Button } from "@/components/ui/button";
import ContactUsImg from "@/public/about_us/contact/4.png";
import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export function ContactCard() {
  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:shadow-2xl border-2 border-gray-200 hover:border-[#ae5809]/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ae5809]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#ae5809]/5 rounded-full translate-y-20 -translate-x-20 group-hover:scale-110 transition-transform duration-700" />
      
      <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-10">
        {/* Left Section: Image */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96">
            <Image
              src={ContactUsImg}
              alt="Gauraj Valleyfood Pvt. Ltd. - Contact Us"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
          
          {/* Image Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
            <MessageCircle className="w-4 h-4 text-[#ae5809]" />
            <span className="text-sm font-semibold text-gray-900">We're Here to Help</span>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="space-y-6 md:space-y-8">
          {/* Quote Section */}
          <div className="relative">
            <div className="absolute -top-4 -left-4">
              <Sparkles className="w-8 h-8 text-[#ae5809]/30" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's Connect and <span className="text-[#ae5809]">Create</span> Together
            </h3>
            <div className="relative">
              <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-[#ae5809] to-transparent hidden md:block" />
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed pl-0 md:pl-4 italic">
                "Have questions or need support? Reach out today and let's grow something amazing together!"
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#ae5809] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#ae5809]" />
                <span className="text-sm font-semibold text-gray-900">Quick Response</span>
              </div>
              <p className="text-xs text-gray-600">24-hour reply guarantee</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#ae5809] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#ae5809]" />
                <span className="text-sm font-semibold text-gray-900">Expert Support</span>
              </div>
              <p className="text-xs text-gray-600">Dedicated team assistance</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ae5809]/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#ae5809]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Ready to Start?</h4>
                <p className="text-sm text-gray-600">Get in touch with our team today</p>
              </div>
            </div>

            <Button
              onClick={handleContactClick}
              className="w-full h-14 bg-[#556b2f] hover:bg-[#556b2f] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group/btn"
            >
              <span className="flex items-center justify-center gap-3">
                Contact Now
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Button>

           
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#ae5809] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}