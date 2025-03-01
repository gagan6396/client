import bgImage from "@/public/l5.jpg"; // Import your background image
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
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Footer */}
      <div className="w-full h-full flex flex-col justify-end">
        <div className="bg-[rgba(255,255,255,0.8)] backdrop-blur-sm pt-5 px-3">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-6 gap-6 grid-cols-2">
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
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#3b5998] transition-colors duration-300"
                  >
                    <AiFillFacebook size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#E1306C] transition-colors duration-300"
                  >
                    <AiFillInstagram size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#0077B5] transition-colors duration-300"
                  >
                    <AiFillLinkedin size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#1DA1F2] transition-colors duration-300"
                  >
                    <AiFillTwitterCircle size={24} />
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
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>

              {/* Top Selling Products Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">
                  Top Selling Products
                </h3>
                <ul>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    Ghee & Oils
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    Hand Grounded Products
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    Herbal Tea
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    Organic Honey
                  </li>
                </ul>
              </div>

              {/* Legal Section */}
              <div>
                <h3 className="uppercase font-bold text-gray-800">Legal</h3>
                <ul>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/Terms&Conditions">Terms & Conditions</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/PrivacyPolicy">Privacy Policy</Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/CancellationRefundPolicy">
                      Cancellation & Refund Policy
                    </Link>
                  </li>
                  <li className="text-sm py-1 hover:text-[#2B0504] transition-colors duration-300">
                    <Link href="/ShippingDeliveryPolicy">
                      Shipping & Delivery Policy
                    </Link>
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
                Copyright © {moment().year()} Gauraaj Valleyfood Private
                Limited. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
