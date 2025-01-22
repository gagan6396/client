"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import arsa from "@/public/arsa.jpg";
import buransh from "@/public/buransh-tea.jpg";
import chamomile from "@/public/chamomile-tea.jpg";
import ghee from "@/public/ghee.jpg";
import ghee1 from "@/public/ghee1.png";
import gujiye from "@/public/gujiye.jpg";
import herbs from "@/public/herbs.png";
import honey from "@/public/honey.jpg";
import honey1 from "@/public/honey1.png";
import l2 from "@/public/l2.jpg";
import l4 from "@/public/l4.jpg";
import millet from "@/public/millet.png";
import mixSweets from "@/public/mix-sweets.jpg";
import moongdaalLadoo from "@/public/moongdaal-ladoo.jpg";
import normalAtta from "@/public/normal-atta.jpg";
import rotana from "@/public/rotana.jpg";
import spices from "@/public/spices.png";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ProductCard } from "./ProductCategoryGrid";

const ProductCategories = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const topCategories = [
    { image: honey, title: "Honey", items: "5 Items" },
    { image: moongdaalLadoo, title: "Moong Daal Ladoo", items: "9 Items" },
    { image: rotana, title: "Rotana", items: "11 Items" },
    { image: gujiye, title: "Gujiya", items: "7 Items" },
    { image: chamomile, title: "Chamomile Tea", items: "3 Items" },
    { image: mixSweets, title: "Mix Sweets", items: "8 Items" },
    { image: normalAtta, title: "Normal Atta", items: "10 Items" },
    { image: buransh, title: "Buransh Tea", items: "4 Items" },
    { image: arsa, title: "Arsa", items: "6 Items" },
    { image: ghee, title: "Ghee", items: "12 Items" },
  ];

  const bestCategories = [
    {
      name: "Organic Grains",
      desc: "Whole, unprocessed grains sourced from sustainable farms.",
      img: millet,
    },
    {
      name: "Spices",
      desc: "Fresh, aromatic spices to elevate your cooking.",
      img: spices,
    },
    {
      name: "Herbs",
      desc: "Handpicked herbs for medicinal and culinary use.",
      img: herbs,
    },
    {
      name: "Oils and Ghees",
      desc: "Nourishing oils for cooking and skincare.",
      img: ghee1,
    },
    {
      name: "Honey",
      desc: "Raw, organic honey packed with natural goodness and health benefits.",
      img: honey1,
    },
  ];

  return (
    <section>
      {/* Top Categories Section */}
      <main className="px-5">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-4xl text-center font-bold py-5">
            Popular Products
          </h1>
          <div className="relative">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="flex space-x-4 py-3">
                {topCategories.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] basis-2/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
                      {/* Use ProductCard for each category */}
                      <ProductCard
                        imageSrc={category.image}
                        title={category.title}
                        price="₹118.75" // Use an appropriate price if available
                        originalPrice="₹125.00" // Use an appropriate original price
                        isBestSeller={true} // You can toggle this dynamically based on category data
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </main>

      <div className="w-full">
        <Image src={l4} alt="l4" />
      </div>

      {/* Best Product Categories Section */}
      <main className="px-5 md:py-14">
        <div className="container mx-auto my-12">
          <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-800 py-5">
            Best Product Categories
          </h2>
          <div className="relative">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="flex space-x-4 py-4">
                {bestCategories.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] basis-1/2 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="bg-white border-gray-200 rounded-lg shadow-lg flex flex-col items-center text-center py-4 px-2 md:py-6 md:px-4 space-y-2 md:space-y-4 hover:shadow-xl transition duration-300">
                      <Image
                        src={category.img}
                        alt={category.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
                      />
                      <h3 className="text-sm md:text-lg font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                        {category.desc}
                      </p>
                      <Link
                        href="/"
                        className="text-green-600 font-medium hover:underline text-xs md:text-sm"
                      >
                        View More
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </main>

      {/* Video and Description Section */}
      <main className="px-5 md:py-14">
        <div className="container mx-auto py-14">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <Image src={l2} alt="l2" />
            </div>

            <div className="flex-1">
              <h2 className="font-bold text-2xl md:text-4xl py-4">
                Discover the Essence of Nature!
              </h2>
              <p className="text-gray-600 mt-4 text-sm md:text-xl">
                At Gauraaj, we&apos;re dedicated to bringing you pure, organic
                products straight from the heart of nature. Experience the
                goodness of sustainable living and join us in creating a
                healthier, greener planet.
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProductCategories;
