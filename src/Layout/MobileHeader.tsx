"use client";

import { Heart, Home, List, ShoppingBag, User } from "lucide-react";

const MobileNavBar = () => {
  return (
    <div className="w-full h-20 px-5 py-2 fixed bottom-0 left-0 bg-[#FEFDFC] flex justify-between items-center border-t border-gray-200 md:hidden">
      <div className="flex flex-col items-center text-gray-700 hover:text-green-600">
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </div>
      <div className="flex flex-col items-center text-gray-700 hover:text-green-600">
        <List size={24} />
        <span className="text-xs mt-1">Categories</span>
      </div>
      <div className="flex flex-col items-center text-gray-700 hover:text-green-600">
        <Heart size={24} />
        <span className="text-xs mt-1">Wishlist</span>
      </div>
      <div className="flex flex-col items-center text-gray-700 hover:text-green-600">
        <User size={24} />
        <span className="text-xs mt-1">Account</span>
      </div>
      <div className="flex flex-col items-center text-gray-700 hover:text-green-600">
        <ShoppingBag size={24} />
        <span className="text-xs mt-1">Cart</span>
      </div>
    </div>
  );
};

export default MobileNavBar;
