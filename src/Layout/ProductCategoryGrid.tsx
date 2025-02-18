"use client";
import { addToCartAPI, deleteToCartAPI } from "@/apis/addToCartAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
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
  inWishlist: boolean;
  inCart: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  originalPrice,
  isBestSeller,
  productId,
  inWishlist,
  inCart,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);
  const [isInCart, setIsInCart] = useState(inCart);

  const addToWishList = async () => {
    try {
      const response = await addToWishListAPI(productId);
      setIsInWishlist(true);
      toast.success(response.data.message || "Item added to wishlist!");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
    }
  };

  const deleteProductFromWishlist = async () => {
    try {
      const response = await deleteProductFromWishlistAPI(productId);
      setIsInWishlist(false);
      toast.success(response.data.message || "Item removed from wishlist!");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from wishlist. Try again later."
      );
    }
  };

  const addToCart = async () => {
    try {
      const response = await addToCartAPI({
        productId: productId,
        quantity: 1,
      });
      setIsInCart(true);
      toast.success(response.data.message || "Item added to cart!");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
    }
  };

  const deleteToCart = async () => {
    try {
      const response = await deleteToCartAPI(productId);
      setIsInCart(false);
      toast.success(response.data.message || "Item removed from cart!");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from cart. Try again later."
      );
    }
  };

  const navigation = useRouter();

  return (
    <div className="bg-white border rounded-lg shadow-lg group relative cursor-pointer transition-all duration-300">
      {/* Badge and Image */}
      <div
        className="relative"
        onClick={() => navigation.push(`/products/${productId}`)}
      >
        <img
          src={imageSrc}
          height={200}
          width={200}
          alt={title}
          className="w-full aspect-square object-cover rounded-tl-lg rounded-tr-lg transition-all duration-300"
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
      <div className="p-4">
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
            <span className="text-green-600 font-bold">₹{price}</span>
            <span className="text-gray-500 line-through ml-2">
              ₹{originalPrice}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            className={`rounded-full w-full transition ${
              isInCart
                ? "bg-[#2B0504] text-white"
                : "bg-transparent text-[#2B0504] border border-[#2B0504] hover:bg-[#2B0504] hover:text-white"
            }`}
            onClick={isInCart ? deleteToCart : addToCart}
          >
            {isInCart ? "Remove from Cart" : "Add To Cart"}
          </Button>
          {isInWishlist ? (
            <FaHeart
              onClick={deleteProductFromWishlist}
              size={30}
              className="text-red-600 hover:scale-105 cursor-pointer transition-all duration-300"
            />
          ) : (
            <CiHeart
              onClick={addToWishList}
              size={30}
              className="text-gray-400 hover:text-red-600 hover:scale-105 cursor-pointer transition-all duration-300"
            />
          )}
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-10">
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
                    inWishlist={product?.inWishlist}
                    inCart={product?.inCart}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Grid for Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 hidden sm:grid">
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
              inWishlist={product?.inWishlist}
              inCart={product?.inCart}
            />
          ))}
      </div>

      {/* See All Products Button */}
      <div className="flex justify-center mt-8">
        <Link
          href={"/products"}
          className="bg-[#2B0504] text-white px-6 py-3 hover:bg-[#3C0606] transition"
        >
          See All Our Products
        </Link>
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
