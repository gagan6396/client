"use client";

import { Heart, Home, List, ShoppingBag, Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavBar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";

  // Function to apply active link style
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex flex-col items-center transition-all duration-300 ${
      isActive
        ? "text-[#7A6E18] scale-110" // Active state with scale effect
        : isScrolled || !isHomePage
        ? "text-gray-600 hover:text-[#7A6E18] hover:scale-105" // Default state when scrolled or not on home
        : "text-white hover:text-[#7A6E18] hover:scale-105 bg-transprint" // Default state on home page
    }`;
  };

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Trigger at 50px for smoother transition
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-20 fixed bottom-0 left-0 flex justify-around items-center border-t border-gray-200 shadow-lg md:hidden z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Home Link */}
      <Link href={"/"}>
        <div className={getLinkClass("/")}>
          <div
            className={`p-2 rounded-full ${
              pathname === "/"
                ? "bg-[#7A6E18]/20 text-[#7A6E18]"
                : "group-hover:bg-[#7A6E18]/10"
            } transition-colors duration-300`}
          >
            <Home size={26} strokeWidth={pathname === "/" ? 2.5 : 2} />
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium">Home</span>
        </div>
      </Link>

      {/* Categories Link */}
      <Link href={"/categories"}>
        <div className={getLinkClass("/categories")}>
          <div
            className={`p-2 rounded-full ${
              pathname === "/categories"
                ? "bg-[#7A6E18]/20 text-[#7A6E18]"
                : "group-hover:bg-[#7A6E18]/10"
            } transition-colors duration-300`}
          >
            <List size={26} strokeWidth={pathname === "/categories" ? 2.5 : 2} />
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium">Categories</span>
        </div>
      </Link>

      {/* Shop Link */}
      <Link href={"/products"}>
        <div className={getLinkClass("/products")}>
          <div
            className={`p-2 rounded-full ${
              pathname === "/products"
                ? "bg-[#7A6E18]/20 text-[#7A6E18]"
                : "group-hover:bg-[#7A6E18]/10"
            } transition-colors duration-300`}
          >
            <Store size={26} strokeWidth={pathname === "/products" ? 2.5 : 2} />
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium">Shop</span>
        </div>
      </Link>

      {/* Wishlist Link */}
      <Link href={"/wishlist"}>
        <div className={getLinkClass("/wishlist")}>
          <div
            className={`p-2 rounded-full ${
              pathname === "/wishlist"
                ? "bg-[#7A6E18]/20 text-[#7A6E18]"
                : "group-hover:bg-[#7A6E18]/10"
            } transition-colors duration-300`}
          >
            <Heart
              size={26}
              strokeWidth={pathname === "/wishlist" ? 2.5 : 2}
              fill={pathname === "/wishlist" ? "currentColor" : "none"}
            />
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium">Wishlist</span>
        </div>
      </Link>

      {/* Account Link */}
      <Link href={"/user-account"}>
        <div className={getLinkClass("/user-account")}>
          <div
            className={`p-2 rounded-full ${
              pathname === "/user-account"
                ? "bg-[#7A6E18]/20 text-[#7A6E18]"
                : "group-hover:bg-[#7A6E18]/10"
            } transition-colors duration-300`}
          >
            <User size={26} strokeWidth={pathname === "/user-account" ? 2.5 : 2} />
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium">Account</span>
        </div>
      </Link>

      {/* Cart Link */}
      <Link href={"/add-to-cart"}>
        <div className={getLinkClass("/add-to-cart")}>
          <div
            className={`p-2 rounded-full ${
              pathname === "/add-to-cart"
                ? "bg-[#7A6E18]/20 text-[#7A6E18]"
                : "group-hover:bg-[#7A6E18]/10"
            } transition-colors duration-300`}
          >
            <ShoppingBag size={26} strokeWidth={pathname === "/add-to-cart" ? 2.5 : 2} />
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium">Cart</span>
        </div>
      </Link>
    </div>
  );
};

export default MobileNavBar;