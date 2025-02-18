"use client";

import logoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Header: React.FC = () => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-[#2B0504] font-semibold border-b-2 border-[#2B0504]"
      : "text-gray-700 hover:text-[#2B0504] transition-colors duration-200";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm ">
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
            className="w-28 md:w-36 h-auto cursor-pointer"
          />
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:block">
          <div className="flex space-x-8">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/about" className={getLinkClass("/about")}>
              About Us
            </Link>
            <Link href="/products" className={getLinkClass("/products")}>
              Our Products
            </Link>
            <Link href="/blogs" className={getLinkClass("/blogs")}>
              Blogs
            </Link>
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Icons Section */}
        <div className="flex items-center space-x-6">
          {accessToken ? (
            <>
              {/* User Dropdown */}
              <div className="relative">
                <AiOutlineUser
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  size={24}
                  className="text-gray-700 hover:text-[#2B0504] cursor-pointer transition-colors duration-200"
                />
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      onClick={() => router.push("/user-account")}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/wishlist")}
              >
                <AiOutlineHeart
                  size={24}
                  className="text-gray-700 hover:text-[#2B0504] transition-colors duration-200"
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping group-hover:animate-none"></div>
              </div>

              {/* Cart */}
              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/add-to-cart")}
              >
                <AiOutlineShoppingCart
                  size={24}
                  className="text-gray-700 hover:text-[#2B0504] transition-colors duration-200"
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping group-hover:animate-none"></div>
              </div>
            </>
          ) : (
            <>
              {/* Login */}
              <AiOutlineUser
                onClick={() => router.push("/login")}
                size={24}
                className="text-gray-700 hover:text-[#2B0504] cursor-pointer transition-colors duration-200"
              />

              {/* Wishlist */}
              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/wishlist")}
              >
                <AiOutlineHeart
                  size={24}
                  className="text-gray-700 hover:text-[#2B0504] transition-colors duration-200"
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping group-hover:animate-none"></div>
              </div>

              {/* Cart */}
              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/add-to-cart")}
              >
                <AiOutlineShoppingCart
                  size={24}
                  className="text-gray-700 hover:text-[#2B0504] transition-colors duration-200"
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping group-hover:animate-none"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;