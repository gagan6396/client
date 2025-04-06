"use client";
import { store } from "@/app/store";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import HeroSection from "@/Layout/HeroSection";
import MobileNavBar from "@/Layout/MobileHeader";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Script from "next/script";
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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <Provider store={store}>
          {!isHome && <Header />}
          {isHome && <HeroSection />}
          <div className="pt-20">{children}</div>
          <MobileNavBar />
          <Footer />
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
