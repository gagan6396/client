"use client";

import { Heart, Home, List, ShoppingBag, Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavBar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/"; // Check if the current page is the home page

  // Function to apply active link style
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;

    if (isActive) {
      return isScrolled || !isHomePage
        ? "text-green-600" // Active link color when scrolled or not on the home page
        : "text-white"; // Active link color on the home page (black background)
    } else {
      return isScrolled || !isHomePage
        ? "text-gray-700 hover:text-green-600" // Default link color when scrolled or not on the home page
        : "text-white hover:text-green-600"; // Default link color on the home page (black background)
    }
  };

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-20 px-5 py-2 fixed bottom-0 left-0 flex justify-between items-center border-t border-gray-200 shadow-lg md:hidden z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-sm"
          : isHomePage
          ? "bg-transparent"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <Link href={"/"}>
        <div
          className={`flex flex-col items-center ${getLinkClass(
            "/"
          )} transition-colors duration-200`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </div>
      </Link>
      <Link href={"/categories"}>
        <div
          className={`flex flex-col items-center ${getLinkClass(
            "/categories"
          )} transition-colors duration-200`}
        >
          <List size={24} />
          <span className="text-xs mt-1">Categories</span>
        </div>
      </Link>
      <Link href={"/products"}>
        <div
          className={`flex flex-col items-center ${getLinkClass(
            "/products"
          )} transition-colors duration-200`}
        >
          <Store size={24} />
          <span className="text-xs mt-1">Shop</span>
        </div>
      </Link>
      <Link href={"/wishlist"}>
        <div
          className={`flex flex-col items-center ${getLinkClass(
            "/wishlist"
          )} transition-colors duration-200`}
        >
          <Heart size={24} />
          <span className="text-xs mt-1">Wishlist</span>
        </div>
      </Link>
      <Link href={"/user-account"}>
        <div
          className={`flex flex-col items-center ${getLinkClass(
            "/user-account"
          )} transition-colors duration-200`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Account</span>
        </div>
      </Link>
      <Link href={"/add-to-cart"}>
        <div
          className={`flex flex-col items-center ${getLinkClass(
            "/add-to-cart"
          )} transition-colors duration-200`}
        >
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">Cart</span>
        </div>
      </Link>
    </div>
  );
};

export default MobileNavBar;
