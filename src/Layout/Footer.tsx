import Link from "next/link";
import Image from "next/image";

import logoImage from "@/public/logo.png";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 px-4 border-t border-gray-300">
      {/* Logo and Slogan */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-40">
          <Image
            src={logoImage}
            alt="Logo"
            width={180}
            height={80}
            className="w-21 h-21"
          />
          <h1
            className="text-3xl font-bold text-center md:text-left"
            style={{ color: "#867916" }}
          >
            🌿 Gauraaj - Pure. Natural. Sustainable.
          </h1>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info Section */}
        <div>
          <p className="text-sm text-gray-600 mb-4">
            <span className="flex items-start">
              <MdLocationOn className="mr-2 text-gray-600" size={20} />
              Gauraaj Valleyfood Pvt. Ltd., New Mohorowala Road, Uttarakhand
              248001
            </span>
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="flex items-center">
              <MdEmail className="mr-2 text-gray-600" size={20} />
              <a
                href="mailto:support@gauraaj.org"
                className="text-gray-600 hover:underline"
              >
                support@gauraaj.org
              </a>
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="flex items-center">
              <MdPhone className="mr-2 text-gray-600" size={20} />
              <a
                href="tel:+916397904655"
                className="text-gray-600 hover:underline"
              >
                +91-6397-90-4655
              </a>
            </span>
          </p>
        </div>

        {/* Top Selling Products */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/products/ghee-oils" className="hover:text-green-600">
                Ghee & Oils
              </Link>
            </li>
            <li>
              <Link
                href="/products/hand-grounded-products"
                className="hover:text-green-600"
              >
                Hand Grounded Products
              </Link>
            </li>
            <li>
              <Link href="/products/herbal-tea" className="hover:text-green-600">
                Herbal Tea
              </Link>
            </li>
            <li>
              <Link
                href="/products/organic-honey"
                className="hover:text-green-600"
              >
                Organic Honey
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/terms" className="hover:text-green-600">
                Terms and Condition
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-green-600">
                Shipping and Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/cancellation-refunds"
                className="hover:text-green-600"
              >
                Cancellation and Refunds
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-green-600">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact and Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="flex space-x-4 my-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600"
            >
              <FaTwitter size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-600 mb-4">Monday - Sunday: 9:30 - 19:30</p>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Gauraaj Valleyfood Private Limited.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
