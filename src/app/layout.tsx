"use client";
import { store } from "@/app/store";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import MobileNavBar from "@/Layout/MobileHeader";
import { Geist, Geist_Mono } from "next/font/google";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <Provider store={store}>
          <Header />
          <div className=" pb-14">{children}</div>
          <MobileNavBar />
          <Footer />
          {/* Toast Notifications */}
          <ToastContainer position="top-center" />
        </Provider>
      </body>
    </html>
  );
}
