"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HeroImage1 from "@/public/hero-bg.png";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useRef, useState } from "react";
interface Content {
  _id: string;
  video: string;
  createdAt: string;
  updatedAt: string;
}

const HomeSlider = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [contents, setContents] = useState<Content[]>([]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (!email) return;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject: "Let's Talk",
          message: `${email} wants to talk.`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Email sent successfully");
        setEmail("");
        // Optionally, provide user feedback
      } else {
        console.log("Email sending failed");
        // Optionally, provide user feedback
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Optionally, provide user feedback
    }
  };
  const plugin: any = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="relative hidden lg:block">
      <div className="bg-black overflow-hidden">
        <h3 className="text-white w-full font-bold text-sm md:text-base">
          {/* Placeholder for any marquee or heading */}
        </h3>
      </div>
      <Carousel
        className=""
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex">
          {Array.isArray(contents) &&
            contents.length > 0 &&
            contents.map((content, index) => (
              <CarouselItem className="w-full" key={index}>
                <div className="w-full h-full">
                  <Image
                    src={HeroImage1}
                    alt={`Slide ${1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay content for the hero section */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="w-45 text-black text-center text-4xl font-bold">
                      Pure, Fresh, Organic - Straight from Nature to Your Home{" "}
                      {}
                    </h1>
                    <p className="text-black text-center">
                      Bringing Nature&apos;s Purity to Your Home
                    </p>
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
