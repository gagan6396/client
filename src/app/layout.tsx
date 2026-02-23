"use client";

import Script from "next/script";
import { store } from "@/app/store";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import HeroSection from "@/Layout/HeroSection";
import MobileNavBar from "@/Layout/MobileHeader";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Instagram, MessageCircle, X, Youtube } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
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
      <head>
        <meta
          name="google-site-verification"
          content="XtC6EQrHH90youbsYyydtk8Mti1pLbXkaCP-_RpzZ3g"
        />

        {/* ✅ Marker.io Official Snippet */}
        {process.env.NEXT_PUBLIC_ENABLE_MARKER === "true" && (
          <Script
            id="marker-io-snippet"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.markerConfig = {
                  project: '699c30e340c2653be4cdbb6d',
                  source: 'snippet'
                };

                !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};
                ["show","hide","isVisible","capture","cancelCapture","unload","reload",
                "isExtensionInstalled","setReporter","clearReporter","setCustomData",
                "on","off"].forEach(function(e){
                n[e]=function(){var r=Array.prototype.slice.call(arguments);
                r.unshift(e),t.push(r)}});
                e.Marker=n;
                var s=r.createElement("script");
                s.async=1;
                s.src="https://edge.marker.io/latest/shim.js";
                var i=r.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(s,i)
                }}(window,document);
              `,
            }}
          />
        )}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {!isHome && <Header />}
          {isHome && <HeroSection />}
          <div className="pt-0 md:padd">{children}</div>
          <MobileNavBar />
          <Footer />

          {/* Contact Button and Social Buttons */}
          <div className="fixed bottom-24 md:bottom-6 right-3 z-50">
            <button
              onClick={toggleContact}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Toggle contact options"
            >
              {isContactOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

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

          <ToastContainer position="top-center" />
        </Provider>

        {/* Razorpay Script */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-7RQ5C4V58F" />
      </body>
    </html>
  );
}