"use client";
import Product1Image from "@/public/product-1.png";
import Product2Image from "@/public/product-2.png";
import Product3Image from "@/public/product-3.png";
import Product4Image from "@/public/product-4.png";
import Product5Image from "@/public/product-5.png";
import Product6Image from "@/public/product-6.png";
import Product7Image from "@/public/product-7.png";
import Product8Image from "@/public/product-8.png";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const products = [
  {
    imageSrc: Product1Image,
    title: "Mixed Sweets",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product2Image,
    title: "Gir Cow Pure Vedic Ghee 500 ml",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product3Image,
    title: "Buransh Tea 30 gms",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product4Image,
    title: "Rotana 500 gms",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product5Image,
    title: "Makki Nachos",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product6Image,
    title: "Normal MP Atta",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product7Image,
    title: "Gujiyas",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
  {
    imageSrc: Product8Image,
    title: "Chamomile Tea",
    price: "₹118.75",
    originalPrice: "₹125.00",
    isBestSeller: true,
  },
];

const ProductPage = () => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  }, [autoplay.current]);

  useEffect(() => {
    if (emblaApi) autoplay.current?.play();
  }, [emblaApi]);

  return (
    <div>
      {/* Carousel Section */}
      <section className="my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Discover Our Organic Products
        </h2>
        <div ref={emblaRef} className="embla w-11/12 mx-auto">
          <div className="embla__container flex gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="embla__slide bg-white shadow-md rounded-xl p-4 my-3 relative min-w-[80%] sm:min-w-[50%] md:min-w-[33%] lg:min-w-[25%]"
              >
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  className="h-56 w-full object-cover rounded-t-xl"
                />
                <h3 className="font-semibold text-lg mt-4">{product.title}</h3>
                <p className="text-gray-700">
                  <span className="font-bold text-black">{product.price}</span>
                  <del className="text-gray-500 ml-2">
                    {product.originalPrice}
                  </del>
                </p>
                <div className="absolute top-5 right-5 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <AiOutlineHeart className="text-red-500 text-lg" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <AiOutlineShoppingCart className="text-green-500 text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Top Products
        </h2>
        <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative"
            >
              <a href="#">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  className="h-60 w-full object-cover rounded-t-xl"
                />
                <div className="px-4 py-3">
                  {product.isBestSeller && (
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      Best Seller
                    </span>
                  )}
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {product.title}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      {product.price}
                    </p>
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        {product.originalPrice}
                      </p>
                    </del>
                  </div>
                </div>
              </a>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <AiOutlineHeart className="text-red-500 text-lg" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <AiOutlineShoppingCart className="text-green-500 text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="my-12 bg-gray-100 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Popular Products
        </h2>
        <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(4).map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative"
            >
              <a href="#">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  className="h-60 w-full object-cover rounded-t-xl"
                />
                <div className="px-4 py-3">
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {product.title}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      {product.price}
                    </p>
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        {product.originalPrice}
                      </p>
                    </del>
                  </div>
                </div>
              </a>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <AiOutlineHeart className="text-red-500 text-lg" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <AiOutlineShoppingCart className="text-green-500 text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
