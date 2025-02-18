"use client";
import Header from "@/Layout/Header";
import heroImage from "@/public/hero-bg.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeroSection = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-white">
      {/* Conditionally render the Header component only on the home page */}
      {pathname === "/" && <Header />}

      {/* Hero Background Image */}
      <Image
        src={heroImage.src}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Hero Content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Experience Himalayan Purity</h1>
        <p className="text-xl mb-8">
          100% Authentic | Superior Quality | Empowering Women's Livelihoods
        </p>
        <Link href="/shop">
          <div className="bg-[#2B0504] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3a0706] transition-colors">
            Shop Now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
