"use client";

import { Input } from "@/components/ui/input";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b shadow-sm md:block top-0 z-50 h-20 md:h-36">
      {/* Top Section */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Image
            src={logoImage}
            alt="Logo"
            width={80}
            height={80}
            className=" w-28 md:w-44"
          />
        </div>

        {/* Search Bar */}
        <div className="md:flex flex-1 justify-center mx-4 hidden">
          <div className="relative w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search for products"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B0504]"
            />
            <AiOutlineSearch
              className="absolute top-2.5 right-4 text-gray-500"
              size={20}
            />
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6 text-gray-600">
          <AiOutlineUser
            size={24}
            className="cursor-pointer hover:text-[#2B0504]"
          />
          <div className="relative cursor-pointer hover:text-[#2B0504]">
            <AiOutlineHeart size={24} />
            <span
              className="absolute -top-2 -right-2 text-white text-xs px-1 rounded-full"
              style={{ backgroundColor: "#00B412" }}
            >
              0
            </span>
          </div>
          <div className="relative cursor-pointer hover:text-[#2B0504]">
            <AiOutlineShoppingCart size={24} />
            <span
              className="absolute -top-2 -right-2 text-white text-xs px-1 rounded-full"
              style={{ backgroundColor: "#00B412" }}
            >
              0
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="bg-white border-t hidden md:block border-b">
        <div className="container mx-auto flex items-center justify-center py-2 px-4 text-gray-700 ">
          {/* Centered Links */}
          <div className="flex space-x-8 items-center pl-12">
            <Link href="/" className="hover:text-[#2B0504]">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#2B0504]">
              About Us
            </Link>
            <Link href="/products" className="hover:text-[#2B0504]">
              Our Products
            </Link>
            <Link href="/blogs" className="hover:text-[#2B0504]">
              Blogs
            </Link>
            <Link href="/contact" className="hover:text-[#2B0504]">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
