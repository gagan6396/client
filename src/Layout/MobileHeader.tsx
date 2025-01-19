"use client";

import { Heart, Home, List, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavBar = () => {
  const pathname = usePathname();

  // Function to apply active link style
  const getLinkClass = (path: string) => {
    return pathname === path ? "text-green-600" : "text-gray-700";
  };

  return (
    <div className="w-full h-20 px-5 py-2 fixed bottom-0 left-0 bg-[#FEFDFC] flex justify-between items-center border-t border-gray-200 md:hidden">
      <Link href={"/"}>
        <div className={`flex flex-col items-center ${getLinkClass("/")}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </div>
      </Link>
      <Link href={"/categories"}>
        <div className={`flex flex-col items-center ${getLinkClass("/categories")}`}>
          <List size={24} />
          <span className="text-xs mt-1">Categories</span>
        </div>
      </Link>
      <Link href={"/wishlist"}>
        <div className={`flex flex-col items-center ${getLinkClass("/wishlist")}`}>
          <Heart size={24} />
          <span className="text-xs mt-1">Wishlist</span>
        </div>
      </Link>
      <Link href={"/user-account"}>
        <div className={`flex flex-col items-center ${getLinkClass("/user-account")}`}>
          <User size={24} />
          <span className="text-xs mt-1">Account</span>
        </div>
      </Link>
      <Link href={"/add-to-cart"}>
        <div className={`flex flex-col items-center ${getLinkClass("/add-to-cart")}`}>
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">Cart</span>
        </div>
      </Link>
    </div>
  );
};

export default MobileNavBar;
