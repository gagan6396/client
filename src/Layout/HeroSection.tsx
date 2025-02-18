"use client";
import heroImage from "@/public/hero1.jpg";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const HeroSection = () => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-[#2B0504] font-semibold"
      : "text-gray-700 hover:text-[#2B0504] transition-colors duration-200";
  };

  return (
    <div className="relative h-screen">
      <Image
        src={heroImage.src}
        alt="Hero Background"
        fill
        className="object-cover"
      />
      <header className="absolute top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm shadow-sm">
        {/* Top Section */}
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
                )} text-white hover:text-[#86790c] transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${getLinkClass(
                  "/about"
                )} text-white hover:text-[#86790c] transition-colors duration-200`}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className={`${getLinkClass(
                  "/products"
                )} text-white hover:text-[#86790c] transition-colors duration-200`}
              >
                Our Products
              </Link>
              <Link
                href="/blogs"
                className={`${getLinkClass(
                  "/blogs"
                )} text-white hover:text-[#86790c] transition-colors duration-200`}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className={`${getLinkClass(
                  "/contact"
                )} text-white hover:text-[#86790c] transition-colors duration-200`}
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Icons Section */}
          <div className="flex items-center space-x-6">
            {accessToken ? (
              <>
                <AiOutlineUser
                  onClick={() => router.push("/user-account")}
                  size={24}
                  className={`${getLinkClass(
                    "/user-account"
                  )} cursor-pointer text-white hover:text-[#86790c] transition-colors duration-200`}
                />
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push("/wishlist")}
                >
                  <AiOutlineHeart
                    size={24}
                    className={`${getLinkClass(
                      "/wishlist"
                    )} text-white hover:text-[#86790c] transition-colors duration-200`}
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
                    )} text-white hover:text-[#86790c] transition-colors duration-200`}
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
                  )} cursor-pointer text-white hover:text-[#86790c] transition-colors duration-200`}
                />
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push("/wishlist")}
                >
                  <AiOutlineHeart
                    size={24}
                    className={`${getLinkClass(
                      "/wishlist"
                    )} text-white hover:text-[#86790c] transition-colors duration-200`}
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
                    )} text-white hover:text-[#86790c] transition-colors duration-200`}
                  />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

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
  );
};

export default HeroSection;
