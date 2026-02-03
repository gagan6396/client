"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import bgImage from "@/public/l5.jpg";
import logo from "@/public/logo2.png";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { toast } from "react-toastify";

// Category interface
interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images?: string[];
}

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  // Fetch categories on component mount
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategoriesAPI();
      setCategories(response?.data?.data || []);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to load categories.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const displayedCategories = showAllCategories 
    ? categories 
    : categories.slice(0, 4);

  return (
    <footer className="relative bg-[#2d5437] overflow-hidden">
      {/* Background Image with Overlay */}
      {/* <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div> */}
      
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/5 to-amber-600/5 blur-sm rounded-full" />
                <Image 
                  src={logo} 
                  alt="Gauraaj Logo" 
                  width={150} 
                  className="relative"
                />
              </div>
              <p className="text-sm leading-relaxed text-white mt-3">
                🌿 Pure. Natural. Sustainable. Embrace nature's essence with 
                Gauraaj's premium organic products for a healthier lifestyle.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-3">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/gauraaj1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white shadow-xs border border-amber-100 flex items-center justify-center text-gray-600 hover:text-[#3b5998] hover:border-amber-200 hover:shadow-sm transition-all duration-300"
                >
                  <AiFillFacebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/gauraaj1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white shadow-xs border border-amber-100 flex items-center justify-center text-gray-600 hover:text-[#E1306C] hover:border-amber-200 hover:shadow-sm transition-all duration-300"
                >
                  <AiFillInstagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white shadow-xs border border-amber-100 flex items-center justify-center text-gray-600 hover:text-[#0077B5] hover:border-amber-200 hover:shadow-sm transition-all duration-300"
                >
                  <AiFillLinkedin size={18} />
                </a>
                <a
                  href="https://www.youtube.com/@gauraaj1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white shadow-xs border border-amber-100 flex items-center justify-center text-gray-600 hover:text-[#FF0000] hover:border-amber-200 hover:shadow-sm transition-all duration-300"
                >
                  <AiFillYoutube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Business Section - Moved below Quick Links */}
            <div className=" mt-3">
              <h4 className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-4">
                Business
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                  >
                    B2B Enquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ALL Products - Full Height Column */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
              TOP SELLING PRODUCTS 
            </h4>
            <ul className="space-y-2">
              {loading ? (
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <li
                      key={index}
                      className="h-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded animate-pulse"
                    />
                  ))
              ) : error ? (
                <li className="text-sm text-red-500">Failed to load</li>
              ) : categories.length === 0 ? (
                <li className="text-sm text-gray-500">No categories</li>
              ) : (
                <>
                  {displayedCategories.map((category) => (
                    <li key={category._id} className="py-1">
                      <Link
                        href={`/products?category=${category._id}`}
                        className="text-sm text-white hover:text-amber-700 transition-colors duration-300 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 flex-shrink-0"></span>
                        <span className="truncate">{category.name}</span>
                      </Link>
                    </li>
                  ))}
                  
                  {/* Show More/Less Toggle - Show only if there are more than 4 categories */}
                  {categories.length > 4 && (
                    <li className="pt-2">
                      <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors duration-300 flex items-center"
                      >
                        <span className="mr-1">{showAllCategories ? "↑ Show Less" : "↓ Show More"}</span>
                      </button>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-and-refund"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-and-delivery"
                  className="text-sm text-white hover:text-amber-700 transition-colors duration-300 block py-1"
                >
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        {/* <div className="mt-8 pt-6 border-t border-amber-100">
          <div className="max-w-md mx-auto text-center space-y-3">
            <h4 className="text-sm font-medium text-gray-800">
              Stay Updated with Nature's Best
            </h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-white border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-gray-800 placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-sm hover:shadow text-sm font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-amber-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-center md:text-left">
              <p className="text-sm text-white">
                Copyright © {moment().year()} Gauraaj Valleyfood Private Limited.
                All Rights Reserved
              </p>
            </div>
            {/* <div className="flex items-center gap-4">
              <Link
                href="/sitemap"
                className="text-sm text-white hover:text-amber-700 transition-colors"
              >
                Sitemap
              </Link>
              <div className="text-sm text-white flex items-center gap-1">
                <span>Made with</span>
                <span className="text-amber-600">♥</span>
                <span>for nature</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;