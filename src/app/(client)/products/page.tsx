"use client";
import { ProductCard } from "@/Layout/ProductCategoryGrid";
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
import { useEffect, useRef } from "react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current]
  );

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
                className="embla__slide rounded-xl p-4 my-3 relative min-w-[80%] sm:min-w-[50%] md:min-w-[33%] lg:min-w-[25%]"
              >
                {/* Use the ProductCard component for each product */}
                <ProductCard
                  imageSrc={product.imageSrc}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  isBestSeller={product.isBestSeller}
                />
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
              {/* Use the ProductCard component for top products */}
              <ProductCard
                imageSrc={product.imageSrc}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                isBestSeller={product.isBestSeller}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="my-12 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Popular Products
        </h2>
        <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(4).map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative"
            >
              {/* Use the ProductCard component for popular products */}
              <ProductCard
                imageSrc={product.imageSrc}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                isBestSeller={product.isBestSeller}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
