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
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export function ProductsVideoCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplay.current]
  );

  const [productsWithVideos, setProductsWithVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

  useEffect(() => {
    if (emblaApi) {
      autoplay.current?.play();
    }
  }, [emblaApi]);

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
    <section className="container py-14 bg-white text-black mx-auto">
      <main>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-full h-96 rounded-md" />
            ))}
          </div>
        ) : productsWithVideos.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No product videos available.
          </p>
        ) : (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex space-x-4">
              {productsWithVideos.map((product: any) => (
                <div
                  key={product._id}
                  className="min-w-[calc(100%/1.25)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/4)] px-2"
                >
                  <Card className="bg-white border rounded-lg shadow-lg group relative transition-all duration-300">
                    <CardContent className="p-0">
                      {/* Video and Badges */}
                      <div
                        className="relative cursor-pointer"
                        onClick={() => handleVideoClick(product._id)}
                      >
                        <video
                          src={product.video}
                          className="w-full rounded-t-lg aspect-[9/16] object-cover transition-all duration-300"
                          muted
                          autoPlay
                          loop
                          playsInline
                          title={`${product.name} Video`}
                        />
                        {product.isBestSeller && (
                          <div className="absolute top-0 right-0 bg-[#2B0504] text-white text-xs px-2 py-1 rounded-md">
                            Best Seller
                          </div>
                        )}
                        <div className="absolute top-0 left-0 bg-[#00B412] text-white text-xs px-2 py-1 rounded-md">
                          -5%
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-2 sm:p-4">
                        <h3 className="text-[#867916] text-sm sm:text-lg font-semibold line-clamp-1">
                          {product.name}
                        </h3>
                        {/* 5-star Rating */}
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.372 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.147 9.101c-.784-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
                            </svg>
                          ))}
                        </div>
                        <div className="flex items-center justify-between py-1 sm:py-2">
                          <div>
                            <span className="text-green-600 font-bold text-sm sm:text-base">
                              ₹{product.price?.$numberDecimal || "N/A"}
                            </span>
                            <span className="text-gray-500 line-through ml-2 text-xs sm:text-sm">
                              ₹{(product.price?.$numberDecimal ?? 0) + "0"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`rounded-full w-full text-xs sm:text-base transition ${
                              product.inCart
                                ? "bg-[#2B0504] text-white hover:bg-[#3C0606]"
                                : "bg-transparent text-[#2B0504] border-[#2B0504] hover:bg-[#2B0504] hover:text-white"
                            }`}
                            onClick={
                              product.inCart
                                ? () => handleDeleteFromCart(product._id)
                                : () => handleAddToCart(product._id)
                            }
                          >
                            {product.inCart
                              ? "Remove from Cart"
                              : "Add to Cart"}
                          </Button>
                          {product.inWishlist ? (
                            <FaHeart
                              onClick={() =>
                                handleDeleteFromWishlist(product._id)
                              }
                              size={24}
                              className="text-red-600 hover:scale-105 cursor-pointer transition-all duration-300"
                            />
                          ) : (
                            <CiHeart
                              onClick={() => handleAddToWishlist(product._id)}
                              size={24}
                              className="text-gray-400 hover:text-red-600 hover:scale-105 cursor-pointer transition-all duration-300"
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </section>
  );
}

export default ProductsVideoCarousel;
