// components/ProductsVideoCarousel.tsx
"use client";

import { addToCartAPI, deleteToCartAPI } from "@/apis/addToCartAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

// Skeleton Card Component
const SkeletonVideoCard = () => (
  <Card className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100">
    <CardContent className="p-0">
      <div className="w-full aspect-[9/16] bg-gray-300 rounded-t-2xl" />
      <div className="p-4 md:p-6 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-4 w-4 bg-gray-300 rounded-full" />
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
    </CardContent>
  </Card>
);

export function ProductsVideoCarousel() {
  const [productsWithVideos, setProductsWithVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsAPI();
        const products = response.data.data.products || [];
        const videoProducts = products.filter((product: any) => product.video);
        setProductsWithVideos(videoProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addToCartAPI({
        productId,
        quantity: 1,
      });
      const updatedProducts: any = productsWithVideos.map((p: any) =>
        p._id === productId ? { ...p, inCart: true } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item added to cart!");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
    }
  };

  const handleDeleteFromCart = async (productId: string) => {
    try {
      const response = await deleteToCartAPI(productId);
      const updatedProducts: any = productsWithVideos.map((p: any) =>
        p._id === productId ? { ...p, inCart: false } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item removed from cart!");
    } catch (error: any) {
      console.error("Error removing from cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from cart. Try again later."
      );
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addToWishListAPI(productId);
      const updatedProducts: any = productsWithVideos.map((p: any) =>
        p._id === productId ? { ...p, inWishlist: true } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item added to wishlist!");
    } catch (error: any) {
      console.error("Error adding to wishlist:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
    }
  };

  const handleDeleteFromWishlist = async (productId: string) => {
    try {
      const response = await deleteProductFromWishlistAPI(productId);
      const updatedProducts: any = productsWithVideos.map((p: any) =>
        p._id === productId ? { ...p, inWishlist: false } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item removed from wishlist!");
    } catch (error: any) {
      console.error("Error removing from wishlist:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from wishlist. Try again later."
      );
    }
  };

  const handleVideoClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="container py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-10 md:mb-12 tracking-tight">
        Featured Product Videos
      </h2>
      <main>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <SkeletonVideoCard key={index} />
            ))}
          </div>
        ) : productsWithVideos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg md:text-xl">
            No product videos available yet. Stay tuned!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {productsWithVideos.map((product: any) => (
              <Card
                key={product._id}
                className="group bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border border-gray-100"
              >
                <CardContent className="p-0">
                  {/* Video and Badges */}
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => handleVideoClick(product._id)}
                  >
                    <video
                      src={product.video}
                      className="w-full rounded-t-2xl aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      autoPlay
                      loop
                      playsInline
                      title={`${product.name} Video`}
                    />
                    {product.isBestSeller && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        Best Seller
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                      -5%
                    </div>
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                  {/* Content */}
                  <div className="p-4 md:p-6 space-y-3">
                    <h3 className="text-gray-800 text-base md:text-lg font-semibold line-clamp-1 group-hover:text-green-700 transition-colors">
                      {product.name}
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
                          ₹{product.price?.$numberDecimal || "N/A"}
                        </span>
                        <span className="text-gray-400 line-through text-sm md:text-base">
                          ₹{(product.price?.$numberDecimal ?? 0) + "0"}
                        </span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3">
                      <Button
                        className={`flex-1 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                          product.inCart
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        onClick={
                          product.inCart
                            ? () => handleDeleteFromCart(product._id)
                            : () => handleAddToCart(product._id)
                        }
                      >
                        {product.inCart ? "Remove" : "Add to Cart"}
                      </Button>
                      {product.inWishlist ? (
                        <FaHeart
                          onClick={() => handleDeleteFromWishlist(product._id)}
                          size={24}
                          className="text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300 cursor-pointer"
                        />
                      ) : (
                        <CiHeart
                          onClick={() => handleAddToWishlist(product._id)}
                          size={24}
                          className="text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </section>
  );
}

export default ProductsVideoCarousel;
