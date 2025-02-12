"use client";
import { addToCartAPI } from "@/apis/addToCartAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import { addToWishListAPI } from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";

// Adjust the type to accept either StaticImageData or string
type ProductCardProps = {
  imageSrc: string; // Allow imported images or external URLs
  title: string;
  price: string;
  originalPrice: string;
  isBestSeller: boolean;
  productId: string;
  skuParameters: any;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  originalPrice,
  isBestSeller,
  productId,
  skuParameters,
}) => {
  const addToWishList = async () => {
    try {
      const response = await addToWishListAPI(productId);
      toast.success(response.data.message || "Item added to wishlist!");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
    }
  };
  const addToCart = async () => {
    try {
      // Convert skuParameters from array-based to single-value selection
      // const selectedSku: Record<string, string> = {};
      // console.log("skuParameters", skuParameters);

      // for (const [param, values] of Object.entries(skuParameters)) {
      //   if (Array.isArray(values) && values.length > 0) {
      //     selectedSku[param] = values[0]; // Select the first available item
      //   }
      // }

      const response = await addToCartAPI({
        productId: productId,
        quantity: 1,
        // skuParameters: selectedSku, // Send the modified SKU parameters
      });

      toast.success(response.data.message || "Item added to cart!");
    } catch (error: any) {
      console.error(error);
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
    }
  };

  const navigation = useRouter();
  return (
    <div className="bg-white border rounded-lg shadow-lg group relative cursor-pointer transition-all duration-300">
      {/* Badge and Image */}
      <div
        className="relative "
        onClick={() => navigation.push(`/products/${productId}`)}
      >
        <img
          src={imageSrc}
          height={200}
          width={200}
          alt={title}
          className="w-full  aspect-square object-cover rounded-tl-lg rounded-tr-lg transition-all duration-300"
        />
      </div>
      {isBestSeller && (
        <div className="absolute top-0 right-0 bg-[#2B0504] text-white text-xs px-5 py-1 rounded-md">
          Best Seller
        </div>
      )}
      <div className="absolute top-0 left-0 bg-[#00B412] text-white text-xs px-5 py-1 rounded-md">
        -5%
      </div>
      {/* Content */}
      <div className=" p-4">
        <h3 className="text-[#867916] text-lg font-semibold line-clamp-1">
          {title}
        </h3>
        {/* 5-star Rating */}
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.372 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.147 9.101c-.784-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>
        <div className="flex items-center justify-between py-2">
          {/* Price and Original Price */}
          <div>
            <span className="text-green-600 font-bold">{price}</span>
            <span className="text-gray-500 line-through ml-2">
              {originalPrice}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            className="rounded-full bg-transparent text-[#2B0504] border border-[#2B0504] w-full hover:bg-[#2B0504] hover:text-white transition"
            onClick={addToCart}
          >
            Add To Cart
          </Button>
          <CiHeart
            onClick={addToWishList}
            size={30}
            className="hover:text-red-600 hover:scale-105 cursor-pointer transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

const ProductCategoryGrid: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [products, setProducts] = useState([]);
  const fetchCategories = async () => {
    try {
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
    <div className="container mx-auto py-7">
      <h1 className="text-center text-2xl md:text-4xl font-bold">
        Our Best Seller Products
      </h1>

      {/* Carousel for Mobile */}
      <div className="relative sm:hidden">
        <Carousel plugins={[plugin.current]} className="w-full p-4">
          <CarouselContent className="flex space-x-4 py-3">
            {products.length > 0 &&
              products.map((product: any, index) => (
                <CarouselItem key={index} className=" basis-2/3">
                  <ProductCard
                    imageSrc={product.images[0]}
                    title={product.name}
                    price={product.price?.$numberDecimal || "N/A"}
                    originalPrice={(product.price?.$numberDecimal ?? 0) + 10}
                    isBestSeller={true}
                    productId={product._id}
                    skuParameters={product.skuParameters}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Grid for Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 hidden sm:grid">
        {products.length > 0 &&
          products.map((product: any, index) => (
            <ProductCard
              key={index}
              imageSrc={product.images[0]}
              title={product.name}
              price={product.price?.$numberDecimal || "N/A"}
              originalPrice={(product.price?.$numberDecimal ?? 0) + 10}
              isBestSeller={true}
              productId={product._id}
              skuParameters={product.skuParameters}
            />
          ))}
      </div>

      {/* See All Products Button */}
      <div className="flex justify-center mt-8">
        <Button className="bg-[#2B0504] text-white px-6 py-3 hover:bg-[#3C0606] transition">
          See All Our Products
        </Button>
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
