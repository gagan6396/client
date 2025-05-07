"use client";
import { store } from "@/app/store";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import HeroSection from "@/Layout/HeroSection";
import MobileNavBar from "@/Layout/MobileHeader";
import { Instagram, MessageCircle, X, Youtube } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {!isHome && <Header />}
          {isHome && <HeroSection />}
          <div className="pt-20">{children}</div>
          <MobileNavBar />
          <Footer />
          {/* Contact Button and Social Buttons */}
          <div className="fixed bottom-24 md:bottom-6 right-3 z-50">
            {/* Contact Button */}
            <button
              onClick={toggleContact}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Toggle contact options"
            >
              {isContactOpen ? (
                <X size={24} />
              ) : (
                <MessageCircle size={24} />
              )}
            </button>
            {/* Social Buttons */}
            {isContactOpen && (
              <div className="absolute bottom-16 right-0 flex flex-col gap-3">
                <a
                  href="https://wa.me/916397904655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#7A6E18] text-white rounded-full p-4 shadow-lg hover:bg-[#7A6E18] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href="https://www.instagram.com/gauraaj1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white rounded-full p-4 shadow-lg hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@gauraaj1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
              </div>
            )}
          </div>
          {/* Toast Notifications */}
          <ToastContainer position="top-center" />
        </Provider>
      </body>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </html>
  );
}