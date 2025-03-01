"use client";
import { addToCartAPI, deleteToCartAPI } from "@/apis/addToCartAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

// Skeleton Product Card
const SkeletonProductCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100">
    <div className="w-full aspect-square bg-gray-300 rounded-t-2xl" />
    <div className="p-4 md:p-6 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-300 rounded-full" />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <div className="h-5 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-12" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 h-10 bg-gray-300 rounded-full" />
        <div className="h-6 w-6 bg-gray-300 rounded-full" />
      </div>
    </div>
  </div>
);

// ProductCard Component
type ProductCardProps = {
  imageSrc: string;
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
  const navigation = useRouter();

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

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border border-gray-100">
      {/* Badge and Image */}
      <div
        className="relative overflow-hidden"
        onClick={() => navigation.push(`/products/${productId}`)}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full aspect-square object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        {isBestSeller && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </div>
        )}
        <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          -5%
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-3">
        <h3 className="text-gray-800 text-base md:text-lg font-semibold line-clamp-1 group-hover:text-green-700 transition-colors">
          {title}
        </h3>
        {/* Rating */}
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.372 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.147 9.101c-.784-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-green-600 font-bold text-lg md:text-xl">
              ₹{price}
            </span>
            <span className="text-gray-400 line-through text-sm md:text-base">
              ₹{originalPrice}
            </span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <Button
            className={`flex-1 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
              isInCart
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            onClick={isInCart ? deleteToCart : addToCart}
          >
            {isInCart ? "Remove" : "Add to Cart"}
          </Button>
          {isInWishlist ? (
            <FaHeart
              onClick={deleteProductFromWishlist}
              size={24}
              className="text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          ) : (
            <CiHeart
              onClick={addToWishList}
              size={24}
              className="text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ProductCategoryGrid Component
const ProductCategoryGrid: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const ProductsResponse = await getProductsAPI();
      console.log(ProductsResponse);
      setProducts(ProductsResponse.data.data.products);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-center text-3xl md:text-5xl font-extrabold text-gray-900 mb-10 md:mb-12 tracking-tight">
        Our Best Seller Products
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {loading
          ? Array(10)
              .fill(0)
              .map((_, index) => <SkeletonProductCard key={index} />)
          : products.length > 0 &&
            products
              .slice(0, 10)
              .map((product: any, index) => (
                <ProductCard
                  key={index}
                  imageSrc={product.images[0]}
                  title={product.name}
                  price={product.price?.$numberDecimal || "N/A"}
                  originalPrice={(product.price?.$numberDecimal ?? 0) + "0"}
                  isBestSeller={true}
                  productId={product._id}
                  skuParameters={product.skuParameters}
                  inWishlist={product?.inWishlist}
                  inCart={product?.inCart}
                />
              ))}
      </div>

      {/* See All Products Button */}
      <div className="flex justify-center mt-10 md:mt-12">
        <Link href="/products">
          <Button className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300">
            See All Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
