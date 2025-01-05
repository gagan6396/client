"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import logoImage from "@/public/logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b">
      {/* Top Section */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image
            src={logoImage}
            alt="Logo"
            width={180}
            height={80}
            className="w-21 h-21"
          />
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 justify-center mx-4">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <AiOutlineSearch className="absolute top-2.5 right-4 text-gray-500" size={20} />
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6 text-gray-600">
          <AiOutlineUser size={24} className="cursor-pointer hover:text-green-500" />
          <div className="relative cursor-pointer hover:text-green-500">
            <AiOutlineHeart size={24} />
            <span
              className="absolute -top-2 -right-2 text-white text-xs px-1"
              style={{ backgroundColor: "#00B412" }}
            >
              0
            </span>
          </div>
          <div className="relative cursor-pointer hover:text-green-500">
            <AiOutlineShoppingCart size={24} />
            <span
              className="absolute -top-2 -right-2 text-white text-xs px-1"
              style={{ backgroundColor: "#00B412" }}
            >
              0
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="bg-white">
        <div className="container mx-auto flex items-center justify-between py-2 text-gray-700">
          {/* Centered Links */}
          <div className="flex-1 flex justify-center space-x-8">
            <Link
              href="/"
              className="text-[#867916] font-semibold border-b-2 border-[#867916]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-[#867916]"
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="hover:text-[#867916]"
            >
              Our Products
            </Link>
            <Link
              href="/blogs"
              className="hover:text-[#867916]"
            >
              Blogs
            </Link>
          </div>

          {/* Right-Aligned Contact Us Button */}
          <div>
            <Button
              variant="default"
              className="bg-black text-white hover:bg-brown-700 px-4 py-2 rounded-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
