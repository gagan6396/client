"use client";
import { getAllSlidersAPI } from "@/apis/slider.service";
import { Button } from "@/components/ui/button";
import logoImage from "@/public/gauraajnew1.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const LOCAL_BANNER_IMAGES = [
  "/banner1.png",
  "/banner2.png",
  "/banner3.jpg",
];

const marqueeItems = [
  "ALL NATURAL",
  "SUSTAINABLY SOURCED",
  "TRUE HEIRLOOM",
  "SINGLE ORIGIN",
  "PESTICIDE FREE",
  "NUTRIENT RICH",
  "WHOLESOME",
  "UPLIFTING WOMEN",
];

const HeroSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const getLinkClass = (path: string) =>
    pathname === path
      ? "text-[#7A6E18] font-semibold border-b-2 border-[#7A6E18]"
      : "text-gray-700 hover:text-[#7A6E18] transition-colors duration-300";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearchInput(false);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev);
  };

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        const response = await getAllSlidersAPI();
        const visibleSliders = response.data.data
          .filter((slider: any) => !slider.isHidden)
          .sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0));

        const bannersWithLocalImages = visibleSliders.map((slider: any, index: number) => ({
          ...slider,
          localImage: LOCAL_BANNER_IMAGES[index] || LOCAL_BANNER_IMAGES[0],
        }));

        setSliders(bannersWithLocalImages);
      } catch (error) {
        console.error("Failed to fetch sliders:", error);
        toast.error("Failed to load banner content", { position: "top-center" });

        const fallbackBanners = LOCAL_BANNER_IMAGES.map((image, index) => ({
          _id: `fallback-${index + 1}`,
          title: `Banner ${index + 1}`,
          subtitle: "Dynamic content will appear here",
          button: { label: "Explore", actionURL: "/products" },
          localImage: image,
        }));

        setSliders(fallbackBanners);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    if (sliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [sliders.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Shop" },
    { href: "/blogs", label: "Voice of the Valley" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="relative overflow-x-hidden w-full">
      <style dangerouslySetInnerHTML={{ __html: `body { overflow-x: hidden; }` }} />
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-[100vw] overflow-hidden">

        {/* ── INFINITE MARQUEE ── */}
        <div className="relative w-full overflow-hidden bg-[#40572c] py-2" style={{ maxWidth: "100vw" }}>
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#40572c] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#40572c] to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="marquee-track flex w-max items-center">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, index) => (
              <div key={index} className="inline-flex items-center">
                <span className="text-white text-xs tracking-[0.2em] font-semibold whitespace-nowrap uppercase px-10">
                  {text}
                </span>
                <span className="text-white/40 text-xs select-none">✦</span>
              </div>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
            .marquee-track {
              animation: marquee 80s linear infinite;
              will-change: transform;
            }
            @media (prefers-reduced-motion: reduce) {
              .marquee-track { animation-play-state: paused; }
            }
          `}} />
        </div>

        {/* Main Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer flex-shrink-0"
              onClick={() => router.push("/")}
            >
              <Image
                src={logoImage}
                alt="Logo"
                width={120}
                height={120}
                className="w-14 sm:w-16 md:w-24 h-auto hover:opacity-90 transition-opacity duration-300"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${getLinkClass(link.href)} text-gray-700 text-base lg:text-lg font-medium whitespace-nowrap`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons — desktop */}
            <div className="hidden md:flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
              <div className="relative flex items-center">
                {showSearchInput ? (
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-48 sm:w-56 md:w-64 rounded-full border border-gray-200 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7A6E18] transition-all duration-300"
                    />
                    <AiOutlineSearch
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                  </form>
                ) : (
                  <AiOutlineSearch
                    onClick={toggleSearchInput}
                    size={26}
                    className="text-gray-700 hover:text-[#7A6E18] cursor-pointer transition-colors duration-300"
                  />
                )}
              </div>

              {accessToken ? (
                <>
                  <AiOutlineUser
                    onClick={() => router.push("/user-account")}
                    size={26}
                    className="text-gray-700 hover:text-[#7A6E18] cursor-pointer transition-colors duration-300"
                  />
                  <div className="relative cursor-pointer group" onClick={() => router.push("/wishlist")}>
                    <AiOutlineHeart size={26} className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                  <div className="relative cursor-pointer group" onClick={() => router.push("/add-to-cart")}>
                    <AiOutlineShoppingCart size={26} className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                </>
              ) : (
                <>
                  <AiOutlineUser
                    onClick={() => router.push("/login")}
                    size={26}
                    className="text-gray-700 hover:text-[#7A6E18] cursor-pointer transition-colors duration-300"
                  />
                  <div className="relative cursor-pointer group" onClick={() => router.push("/wishlist")}>
                    <AiOutlineHeart size={26} className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                  <div className="relative cursor-pointer group" onClick={() => router.push("/add-to-cart")}>
                    <AiOutlineShoppingCart size={26} className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                </>
              )}
            </div>

            {/* Mobile right side: icons + hamburger */}
            <div className="flex md:hidden items-center space-x-3 flex-shrink-0">
              <AiOutlineSearch
                onClick={toggleSearchInput}
                size={22}
                className="text-gray-700 hover:text-[#7A6E18] cursor-pointer transition-colors duration-300"
              />
              <div className="relative cursor-pointer" onClick={() => router.push("/wishlist")}>
                <AiOutlineHeart size={22} className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
              </div>
              <div className="relative cursor-pointer" onClick={() => router.push("/add-to-cart")}>
                <AiOutlineShoppingCart size={22} className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
              </div>
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300 p-1"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {showSearchInput && (
            <div className="md:hidden px-4 pb-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7A6E18] transition-all duration-300"
                />
                <AiOutlineSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
              </form>
            </div>
          )}

          {/* Mobile Nav Drawer */}
          {mobileMenuOpen && (
            <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${getLinkClass(link.href)} text-gray-700 text-base font-medium py-2 border-b border-gray-50`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                {accessToken ? (
                  <button
                    onClick={() => { router.push("/user-account"); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#7A6E18] text-base font-medium py-2"
                  >
                    <AiOutlineUser size={20} /> My Account
                  </button>
                ) : (
                  <button
                    onClick={() => { router.push("/login"); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#7A6E18] text-base font-medium py-2"
                  >
                    <AiOutlineUser size={20} /> Login
                  </button>
                )}
              </div>
            </nav>
          )}
        </header>
      </div>

      {/* Spacer — taller on mobile to account for potential search bar */}
      <div className="pt-[110px] md:pt-[120px]"></div>

      {/* Hero Carousel */}
      <div id="hero-section" className="relative h-screen overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#fef9f1] via-[#f5f0dc] to-[#e7dbac] z-50">
            <ClipLoader color="#7A6E18" size={50} />
            <p className="text-[#7A6E18] text-lg font-medium animate-pulse">
              Loading banners...
            </p>
          </div>
        ) : sliders.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#fef9f1] via-[#f5f0dc] to-[#e7dbac]">
            <p className="text-gray-700 text-lg">No banners available</p>
          </div>
        ) : (
          <>
            {sliders.map((slider, index) => (
              <div
                key={slider._id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slider.localImage || "/banner1.jpg"}
                  alt={slider.title}
                  fill
                  className="object-cover brightness-75"
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex items-center z-10">
                  <div className="text-left text-white px-4 sm:px-6">
                    <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight animate-fade-in">
                      {slider.title}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-xl mb-8 md:mb-10 max-w-3xl leading-relaxed">
                      {slider.subtitle}
                    </p>
                    <Button
                      asChild
                      className="bg-[#2d5437] text-white hover:bg-[#234d2d] px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href={slider.button?.actionURL || "/products"}>
                        {slider.button?.label || "Explore"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {sliders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  } hover:bg-white transition-all duration-300`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;