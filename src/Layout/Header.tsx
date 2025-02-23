"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false); // State to toggle search input visibility
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

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        {/* Logo */}
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

        {/* Navigation Links */}
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
            {/* <Link href="/blogs" className={getLinkClass("/blogs")}>
              Blogs
            </Link> */}
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Search and Icons */}
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
                  className="pl-10 pr-4 py-2 w-40 sm:w-56 md:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B0504] transition-all duration-200"
                />
                <AiOutlineSearch
                  className="absolute left-3 text-gray-500"
                  size={20}
                />
              </form>
            ) : (
              <AiOutlineSearch
                onClick={toggleSearchInput}
                size={24}
                className="text-gray-700 hover:text-[#2B0504] cursor-pointer transition-colors duration-200"
              />
            )}
          </div>

          {/* User Actions */}
          {accessToken ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <AiOutlineUser
                      size={24}
                      className="text-gray-700 hover:text-[#2B0504] transition-colors duration-200"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem
                    onClick={() => router.push("/user-account")}
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
              <AiOutlineUser
                onClick={() => router.push("/login")}
                size={24}
                className="text-gray-700 hover:text-[#2B0504] cursor-pointer transition-colors duration-200"
              />
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