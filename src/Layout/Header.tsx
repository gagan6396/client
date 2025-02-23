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
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai"; // Added AiOutlineMenu for mobile menu

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const getLinkClass = (path: string) =>
    pathname === path
      ? "text-green-600 font-semibold border-b-2 border-green-600"
      : "text-gray-700 hover:text-green-600 transition-colors duration-300";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logoImage}
            alt="Logo"
            width={120}
            height={120}
            className="w-20 sm:w-24 md:w-28 h-auto hover:opacity-90 transition-opacity duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <Link href="/" className={`${getLinkClass("/")} text-base lg:text-lg font-medium`}>
            Home
          </Link>
          <Link href="/about" className={`${getLinkClass("/about")} text-base lg:text-lg font-medium`}>
            About Us
          </Link>
          <Link href="/products" className={`${getLinkClass("/products")} text-base lg:text-lg font-medium`}>
            Products
          </Link>
          <Link href="/contact" className={`${getLinkClass("/contact")} text-base lg:text-lg font-medium`}>
            Contact Us
          </Link>
        </nav>

        {/* Search and Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-56 md:w-64 lg:w-72 rounded-full border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
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
                className="text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300"
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
                      size={26}
                      className="text-gray-700 hover:text-green-500 transition-colors duration-300"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white shadow-lg rounded-md border border-gray-100">
                  <DropdownMenuItem
                    onClick={() => router.push("/user-account")}
                    className="cursor-pointer text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
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
                  size={26}
                  className="text-gray-700 hover:text-green-500 transition-colors duration-300"
                />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
              </div>

              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/add-to-cart")}
              >
                <AiOutlineShoppingCart
                  size={26}
                  className="text-gray-700 hover:text-green-500 transition-colors duration-300"
                />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
              </div>
            </>
          ) : (
            <>
              <AiOutlineUser
                onClick={() => router.push("/login")}
                size={26}
                className="text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300"
              />
              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/wishlist")}
              >
                <AiOutlineHeart
                  size={26}
                  className="text-gray-700 hover:text-green-500 transition-colors duration-300"
                />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
              </div>
              <div
                className="relative cursor-pointer group"
                onClick={() => router.push("/add-to-cart")}
              >
                <AiOutlineShoppingCart
                  size={26}
                  className="text-gray-700 hover:text-green-500 transition-colors duration-300"
                />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse group-hover:animate-none" />
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <AiOutlineSearch
            onClick={toggleSearchInput}
            size={26}
            className="text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300"
          />
          <AiOutlineMenu
            onClick={toggleMobileMenu}
            size={26}
            className="text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 sm:px-6 border-t border-gray-200">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className={`${getLinkClass("/")} text-lg font-medium`} onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link href="/about" className={`${getLinkClass("/about")} text-lg font-medium`} onClick={toggleMobileMenu}>
              About Us
            </Link>
            <Link href="/products" className={`${getLinkClass("/products")} text-lg font-medium`} onClick={toggleMobileMenu}>
              Products
            </Link>
            <Link href="/contact" className={`${getLinkClass("/contact")} text-lg font-medium`} onClick={toggleMobileMenu}>
              Contact Us
            </Link>
            {accessToken ? (
              <>
                <Link href="/user-account" className={`${getLinkClass("/user-account")} text-lg font-medium`} onClick={toggleMobileMenu}>
                  Profile
                </Link>
                <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors duration-300 text-left">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className={`${getLinkClass("/login")} text-lg font-medium`} onClick={toggleMobileMenu}>
                Login
              </Link>
            )}
            <Link href="/wishlist" className={`${getLinkClass("/wishlist")} text-lg font-medium`} onClick={toggleMobileMenu}>
              Wishlist
            </Link>
            <Link href="/add-to-cart" className={`${getLinkClass("/add-to-cart")} text-lg font-medium`} onClick={toggleMobileMenu}>
              Cart
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {showSearchInput && (
        <div className="md:hidden bg-white py-4 px-4 sm:px-6 border-t border-gray-200">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <AiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;