"use client";
import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import l2 from "@/public/l2.jpg";
import l4 from "@/public/l4.jpg";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCategoryGrid";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [products, setProducts] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAPI();
      console.log(response.data.data);
      setCategories(response.data.data);

      const ProductsResponse = await getProductsAPI();
      console.log(ProductsResponse);

      setProducts(ProductsResponse.data.data.products);
    } catch (error: any) {
      // console.log(error.response.data);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
                {products.length > 0 &&
                  products.map((product: any, index) => (
                    <CarouselItem
                      key={index}
                      className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] basis-2/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
                        {/* Use ProductCard for each category */}
                        <ProductCard
                          imageSrc={product.images[0]}
                          title={product.name}
                          price={product.price?.$numberDecimal || "N/A"}
                          originalPrice={
                            (product.price?.$numberDecimal ?? 0) + 10
                          }
                          isBestSeller={true}
                          productId={product._id}
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
                {categories.map((category: any, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] basis-1/2 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="bg-white border-gray-200 rounded-lg shadow-lg flex flex-col items-center text-center py-4 px-2 md:py-6 md:px-4 space-y-2 md:space-y-4 hover:shadow-xl transition duration-300">
                      <Image
                        src={category?.images[0]}
                        alt={category?.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
                      />
                      <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                        {category.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                        {category.description}
                      </p>
                      <Link
                        href={`/products?category=${category._id}`}
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
