"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import shadcn dropdown components
import logoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Header: React.FC = () => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
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
    <header className="bg-white border-b shadow-sm">
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
              {/* User Dropdown with shadcn */}
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
