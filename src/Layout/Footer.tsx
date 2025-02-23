"use client";
import logo from "@/public/logo.png";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Logo and Social Media Section */}
          <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <Image
                src={logo}
                alt="Gauraaj Logo"
                width={180}
                height={60}
                className="h-auto w-36 md:w-48 hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              🌿 Pure. Natural. Sustainable.
            </p>
            <div className="flex gap-4 md:gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#3b5998] transition-colors duration-300 transform hover:scale-110"
              >
                <AiFillFacebook size={28} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#E1306C] transition-colors duration-300 transform hover:scale-110"
              >
                <AiFillInstagram size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0077B5] transition-colors duration-300 transform hover:scale-110"
              >
                <AiFillLinkedin size={28} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#1DA1F2] transition-colors duration-300 transform hover:scale-110"
              >
                <AiFillTwitterCircle size={28} />
              </a>
            </div>
          </div>

          {/* Pages Section */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 tracking-tight">
              Pages
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 tracking-tight">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 tracking-tight">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/Terms&Conditions"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/PrivacyPolicy"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/CancellationRefundPolicy"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link
                  href="/ShippingDeliveryPolicy"
                  className="text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 md:my-12 border-gray-200" />

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-sm md:text-base text-gray-600">
            &copy; {moment().year()} Gauraaj Valleyfood Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;