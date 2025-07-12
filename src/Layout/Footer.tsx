"use client";

import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import bgImage from "@/public/l5.jpg";
import logo from "@/public/logo.png";
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

  return (
    <div
      className="w-full block"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full">
        <div className="bg-[rgba(255,255,255,0.8)] backdrop-blur-sm pt-5 px-3">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-7 gap-6 grid-cols-2">
              {/* Logo and Social Media Section */}
              <div className="col-span-2 flex items-center flex-col">
                <div className="font-bold py-1">
                  <Image src={logo} alt="Logo" width={200} />
                </div>
                <p className="text-sm py-1 text-center">
                  🌿 Gauraaj - Pure. Natural. Sustainable.
                </p>
                <div className="flex gap-4 py-1">
                  <a
                    href="https://www.facebook.com/gauraaj1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#3b5998] transition-colors duration-300"
                  >
                    <AiFillFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/gauraaj1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#E1306C] transition-colors duration-300"
                  >
                    <AiFillInstagram size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#0077B5] transition-colors duration-300"
                  >
                    <AiFillLinkedin size={24} />
                  </a>
                  <a
                    href="https://www.youtube.com/@gauraaj1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#FF0000] transition-colors duration-300"
                  >
                    <AiFillYoutube size={24} />
                  </a>
                </div>
              </div>
              {/* Pages Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">Pages</h3>
                <ul>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/products">Products</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/about">About Us</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
              {/* Social Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">Social</h3>
                <ul>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <a
                      href="https://www.instagram.com/gauraaj1/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <a
                      href="https://www.facebook.com/gauraaj1/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <a
                      href="https://www.youtube.com/@gauraaj1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YouTube
                    </a>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
              {/* Top Selling Products Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">Top Selling Products</h3>
                <ul>
                  {loading ? (
                    // Skeleton loader for categories
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <li
                          key={index}
                          className="text-sm py-1 animate-pulse bg-gray-200 h-4 rounded w-3/4"
                        />
                      ))
                  ) : error ? (
                    <li className="text-sm py-1 text-red-500">
                      Failed to load categories
                    </li>
                  ) : categories.length === 0 ? (
                    <li className="text-sm py-1 text-gray-500">
                      No categories available
                    </li>
                  ) : (
                    categories.map((category) => (
                      <li
                        key={category._id}
                        className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300 cursonr-pointer"
                      >
                        <Link href={`/products?category=${category._id}`}>
                          {category.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              {/* Legal Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">Legal</h3>
                <ul>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/cancellation-and-refund">
                      Cancellation & Refund Policy
                    </Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/shipping-and-delivery">
                      Shipping & Delivery Policy
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Bulk Enquiry Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">Bulk Enquiry</h3>
                <ul>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/contact">B2B Enquiry</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="container mx-auto p-4">
            <hr className="border-gray-300" />
          </div>
          {/* Copyright Section */}
          <div className="container mx-auto p-4">
            <div className="flex justify-center items-center flex-col md:flex-row gap-3">
              <p className="text-sm text-gray-700">
                Copyright © {moment().year()} Gauraaj Valleyfood Private Limited.
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;