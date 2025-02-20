"use client";
import heroImage from "@/public/hero1.jpg";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

const HeroSection = () => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false); // State to toggle search input visibility

  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-[#2B0504] font-semibold"
      : "text-gray-700 hover:text-[#2B0504] transition-colors duration-200";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearchInput(false); // Hide search input after submission
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev); // Toggle search input visibility
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled at all
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div id="hero-section" className="h-screen relative">
        <Image
          src={heroImage.src}
          alt="Hero Background"
          fill
          className="object-cover"
        />
        {/* Hero Text Section */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our Store
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Discover the best products for your needs
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-[#2B0504] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#86790c] transition-colors duration-200"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Header Section */}
      <header
        className={`${
          isSticky
            ? "fixed top-0 left-0 right-0 bg-white bg-opacity-90"
            : "absolute top-0 left-0 right-0 bg-transparent"
        } z-50 backdrop-blur-sm shadow-sm transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-6 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={logoImage}
              alt="Logo"
              width={120}
              height={120}
              className="w-20 md:w-28 h-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
            />
          </div>

          {/* Navigation Section */}
          <nav className="hidden md:block">
            <div className="flex space-x-8">
              <Link
                href="/"
                className={`${getLinkClass(
                  "/"
                )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${getLinkClass(
                  "/about"
                )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className={`${getLinkClass(
                  "/products"
                )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
              >
                Our Products
              </Link>
              <Link
                href="/blogs"
                className={`${getLinkClass(
                  "/blogs"
                )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className={`${getLinkClass(
                  "/contact"
                )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Search and Icons Section */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Icon and Input */}
            <div className="flex items-center">
              {showSearchInput ? (
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-40 sm:w-56 md:w-64 border ${
                      isSticky ? "border-gray-300" : "border-white"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B0504] transition-all duration-200 ${
                      isSticky ? "text-gray-700" : "text-white bg-transparent placeholder-white"
                    }`}
                  />
                  <AiOutlineSearch
                    className={`absolute left-3 ${
                      isSticky ? "text-gray-500" : "text-white"
                    }`}
                    size={20}
                  />
                </form>
              ) : (
                <AiOutlineSearch
                  onClick={toggleSearchInput}
                  size={24}
                  className={`cursor-pointer ${
                    isSticky ? "text-gray-700" : "text-white"
                  } hover:text-[#86790c] transition-colors duration-200`}
                />
              )}
            </div>

            {/* Icons Section */}
            {accessToken ? (
              <>
                <AiOutlineUser
                  onClick={() => router.push("/user-account")}
                  size={24}
                  className={`${getLinkClass(
                    "/user-account"
                  )} cursor-pointer ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
                />
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push("/wishlist")}
                >
                  <AiOutlineHeart
                    size={24}
                    className={`${getLinkClass(
                      "/wishlist"
                    )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
                  />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push("/add-to-cart")}
                >
                  <AiOutlineShoppingCart
                    size={24}
                    className={`${getLinkClass(
                      "/add-to-cart"
                    )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
                  />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </>
            ) : (
              <>
                <AiOutlineUser
                  onClick={() => router.push("/login")}
                  size={24}
                  className={`${getLinkClass(
                    "/login"
                  )} cursor-pointer ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
                />
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push("/wishlist")}
                >
                  <AiOutlineHeart
                    size={24}
                    className={`${getLinkClass(
                      "/wishlist"
                    )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
                  />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push("/add-to-cart")}
                >
                  <AiOutlineShoppingCart
                    size={24}
                    className={`${getLinkClass(
                      "/add-to-cart"
                    )} ${isSticky ? "text-gray-700" : "text-white"} hover:text-[#86790c] transition-colors duration-200`}
                  />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeroSection;