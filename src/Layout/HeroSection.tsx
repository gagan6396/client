"use client";
import { getAllSlidersAPI } from "@/apis/slider.service";
import { Button } from "@/components/ui/button";
import logoImage from "@/public/logo3.png";
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
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

// Local banner images - these are static
const LOCAL_BANNER_IMAGES = [
  "/banner1.png",
  "/banner2.png", 
  "/banner3.jpg",
  // Add more as needed: "/banner4.jpg", "/banner5.jpg", etc.
];

const HeroSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch sliders from backend for dynamic text
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        const response = await getAllSlidersAPI();
        // Filter out hidden sliders and sort by sequence
        const visibleSliders = response.data.data
          .filter((slider: any) => !slider.isHidden)
          .sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0));
        
        // Combine local images with API text data
        const bannersWithLocalImages = visibleSliders.map((slider: any, index: number) => ({
          ...slider,
          // Use local image if available, otherwise use API image
          localImage: LOCAL_BANNER_IMAGES[index] || LOCAL_BANNER_IMAGES[0]
        }));
        
        setSliders(bannersWithLocalImages);
      } catch (error) {
        console.error("Failed to fetch sliders:", error);
        toast.error("Failed to load banner content", { position: "top-center" });
        
        // Create fallback banners with local images
        const fallbackBanners = LOCAL_BANNER_IMAGES.map((image, index) => ({
          _id: `fallback-${index + 1}`,
          title: `Banner ${index + 1}`,
          subtitle: "Dynamic content will appear here",
          button: {
            label: "Explore",
            actionURL: "/products"
          },
          localImage: image
        }));
        
        setSliders(fallbackBanners);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  // Carousel auto-slide effect
  useEffect(() => {
    if (sliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }, 10000); // Change slide every 10 seconds
      return () => clearInterval(interval);
    }
  }, [sliders.length]);

  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Green Banner */}
        <div className=" bg-[#2d5437] text-white text-center py-2 px-4">
          <p className="text-sm md:text-base ">Himalayan A2 Cow Ghee is Available Now</p>
        </div>
        
        {/* Main Header - Always white and sticky */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src={logoImage}
                alt="Logo"
                width={120}
                height={120}
                className="w-16 sm:w-20 md:w-24 h-auto hover:opacity-90 transition-opacity duration-300"
              />
            </div>

            {/* Navigation Section */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              <Link
                href="/"
                className={`${getLinkClass("/")} text-gray-700 text-base lg:text-lg font-medium`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${getLinkClass("/about")} text-gray-700 text-base lg:text-lg font-medium`}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className={`${getLinkClass("/products")} text-gray-700 text-base lg:text-lg font-medium`}
              >
                Shop
              </Link>
              <Link
                href="/blogs"
                className={`${getLinkClass("/blogs")} text-gray-700 text-base lg:text-lg font-medium`}
              >
                Voice of the Valley
              </Link>
              <Link
                href="/contact"
                className={`${getLinkClass("/contact")} text-gray-700 text-base lg:text-lg font-medium`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Search and Icons Section */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Search Icon and Input */}
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

              {/* Icons Section */}
              {accessToken ? (
                <>
                  <AiOutlineUser
                    onClick={() => router.push("/user-account")}
                    size={26}
                    className="text-gray-700 hover:text-[#7A6E18] cursor-pointer transition-colors duration-300"
                  />
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => router.push("/wishlist")}
                  >
                    <AiOutlineHeart
                      size={26}
                      className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300"
                    />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => router.push("/add-to-cart")}
                  >
                    <AiOutlineShoppingCart
                      size={26}
                      className="text-gray700 hover:text-[#7A6E18] transition-colors duration-300"
                    />
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
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => router.push("/wishlist")}
                  >
                    <AiOutlineHeart
                      size={26}
                      className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300"
                    />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => router.push("/add-to-cart")}
                  >
                    <AiOutlineShoppingCart
                      size={26}
                      className="text-gray-700 hover:text-[#7A6E18] transition-colors duration-300"
                    />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      </div>
      
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="pt-[100px] md:pt-[120px]"></div>

      {/* Hero Carousel Section */}
      <div id="hero-section" className="relative h-screen overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#fef9f1] via-[#f5f0dc] to-[#e7dbac] z-50">
            <ClipLoader color="#7A6E18" size={50} />
            <p className=" text-[#7A6E18] text-lg font-medium animate-pulse">
              Loading banners...
            </p>
          </div>
        ) : sliders.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#fef9f1] via-[#f5f0dc] to-[#e7dbac]">
            <p className="text-gray-700 text-lg">No banners available</p>
          </div>
        ) : (
          <>
            {/* Carousel Images and Text */}
            {sliders.map((slider, index) => (
              <div
                key={slider._id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Use local image */}
                <Image
                  src={slider.localImage || "/banner1.jpg"}
                  alt={slider.title}
                  fill
                  className="object-cover brightness-75"
                  priority={index === 0}
                />
                
                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/60" /> */}
                
                {/* Hero Text Section - Dynamic from API */}
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
            
            {/* Carousel Dots */}
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