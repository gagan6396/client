"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Add icons for menu and close

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/" passHref>
            <div className="text-3xl font-bold">ShopEase</div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/shop" passHref>
            <div className="hover:text-gray-300">Shop</div>
          </Link>
          <Link href="/about" passHref>
            <div className="hover:text-gray-300">About Us</div>
          </Link>
          <Link href="/contact" passHref>
            <div className="hover:text-gray-300">Contact</div>
          </Link>
          <Link href="/cart" passHref>
            <div className="hover:text-gray-300">Cart</div>
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Button
            onClick={toggleMenu}
            variant="secondary"
            size="sm"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600"
          >
            {isMenuOpen ? (
              <HiX className="text-xl" />
            ) : (
              <HiMenu className="text-xl" />
            )}
          </Button>
        </div>

        {/* User Auth and Cart Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" passHref>
            <div className="hover:text-gray-300">Login</div>
          </Link>
          <Link href="/signup" passHref>
            <div className="hover:text-gray-300">Sign Up</div>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600"
          >
            Cart (0)
          </Button>
        </div>
      </div>

      {/* Mobile Menu (Sheet style) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      <div
        className={`fixed top-0 right-0 w-64 bg-gray-900 text-white h-full shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="text-3xl font-bold">ShopEase</div>
          <Button
            onClick={toggleMenu}
            variant="secondary"
            size="sm"
            className="text-white"
          >
            <HiX className="text-xl" />
          </Button>
        </div>

        <nav className="flex flex-col items-center space-y-6">
          <Link href="/shop" passHref>
            <div onClick={toggleMenu} className="hover:text-gray-300">
              Shop
            </div>
          </Link>
          <Link href="/about" passHref>
            <div onClick={toggleMenu} className="hover:text-gray-300">
              About Us
            </div>
          </Link>
          <Link href="/contact" passHref>
            <div onClick={toggleMenu} className="hover:text-gray-300">
              Contact
            </div>
          </Link>
          <Link href="/cart" passHref>
            <div onClick={toggleMenu} className="hover:text-gray-300">
              Cart
            </div>
          </Link>
          <Link href="/login" passHref>
            <div onClick={toggleMenu} className="hover:text-gray-300">
              Login
            </div>
          </Link>
          <Link href="/signup" passHref>
            <div onClick={toggleMenu} className="hover:text-gray-300">
              Sign Up
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
