"use client";

import {
  addToCartAPI,
  deleteToCartAPI,
} from "@/apis/addToCartAPIs";
import {
  deleteProductFromWishlistAPI,
  getWishListAPI,
} from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Updated WishlistItem interface
interface WishlistItemProps {
  imageSrc: string;
  secondaryImageSrc: string;
  title: string;
  price: string; // Price as $numberDecimal string
  originalPrice?: number; // Calculated original price before discount
  discount?: number; // Discount percentage
  productId: string;
  variantId: string;
  isInCart: boolean;
  onRemove: () => void;
}

const WishlistItem = ({
  imageSrc,
  secondaryImageSrc,
  title,
  price,
  originalPrice,
  discount,
  productId,
  variantId,
  isInCart,
  onRemove,
}: WishlistItemProps) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [inCart, setInCart] = useState(isInCart);

  const handleAddToCart = async () => {
    try {
      const response = await addToCartAPI({
        productId,
        variantId,
        quantity: 1,
      });
      setInCart(true);
      toast.success(response?.data?.message || "Added to cart!");
    } catch (error: any) {
      toast.info(error?.response?.data?.message || "Failed to add to cart.");
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await deleteToCartAPI({
        productId,
        variantId,
      });
      setInCart(false);
      toast.success(response?.data?.message || "Removed from cart!");
    } catch (error: any) {
      toast.info(error?.response?.data?.message || "Failed to remove from cart.");
    }
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 border border-gray-100 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden cursor-pointer">
        <img
          src={hovered ? secondaryImageSrc : imageSrc}
          alt={title}
          className="w-full aspect-square object-cover rounded-t-xl transition-all duration-300"
          onClick={() => router.push(`/products/${productId}`)}
        />
        {/* {discount && originalPrice && (
          <div className="absolute top-2 left-2 bg-[#7A6E18]/90 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            -{discount}% (₹{((originalPrice - parseFloat(price)).toFixed(2))})
          </div>
        )} */}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300"
          aria-label="Remove from Wishlist"
        >
          <Trash2 size={20} />
        </button>
      </div>
      {/* Content Section */}
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3
            className="text-gray-800 text-sm font-medium group-hover:text-[#7A6E18] transition-colors line-clamp-2 cursor-pointer"
            title={title}
            onClick={() => router.push(`/products/${productId}`)}
          >
            {title}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-[#556b2f] font-bold text-sm">
              ₹{parseFloat(price).toFixed(2)}
            </span>
            {/* {discount && originalPrice && (
              <span className="text-gray-400 line-through text-xs">
                ₹{originalPrice.toFixed(2)}
              </span>
            )} */}
          </div>
        </div>
        <Button
          className={`w-full rounded-full text-xs font-medium transition-all ${
            inCart
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[#556b2f] text-white hover:bg-[#3c5216]"
          }`}
          onClick={inCart ? handleRemoveFromCart : handleAddToCart}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishlist data
  const getWishList = async () => {
    try {
      setLoading(true);
      const response = await getWishListAPI();
      if (response.data && response.data.data) {
        setWishlist(response.data.data.product_id);
      } else {
        setError("No items found in your wishlist.");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (productId: string) => {
    try {
      await deleteProductFromWishlistAPI(productId);
      toast.success("Item removed from wishlist!");
      getWishList(); // Refresh the wishlist
    } catch (error) {
      console.error("Error removing product:", error);
      toast.info("Failed to remove item. Please try again.");
    }
  };

  // Function to get primary variant
  const getPrimaryVariant = (variants: any[]) => {
    const activeDiscountVariant = variants.find(
      (v) => v.discount?.active && v.discount?.value
    );
    return activeDiscountVariant || variants[0];
  };

  return (
    <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 md:mb-14 tracking-tight">
        Your Wishlist
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100"
     >
              <Skeleton className="w-full aspect-square rounded-t-xl" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center mt-12 md:mt-16">
          <Heart
            size={80}
            className="text-gray-200 mx-auto mb-6 animate-pulse"
          />
          <p className="text-lg md:text-xl text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Wishlist Items */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {wishlist.length > 0 ? (
              wishlist.map((item) => {
                const primaryVariant = getPrimaryVariant(item.variants);
                const price = parseFloat(primaryVariant.price.$numberDecimal);
                const discount =
                  primaryVariant.discount?.active &&
                  primaryVariant.discount?.value
                    ? primaryVariant.discount.value
                    : 0;
                const originalPrice = discount
                  ? price / (1 - discount / 100)
                  : undefined;

                return (
                  <WishlistItem
                    key={item._id}
                    imageSrc={
                      item.images.find((img: any) => img.sequence === 0)?.url ||
                      "/placeholder-image.jpg"
                    }
                    secondaryImageSrc={
                      item.images.find((img: any) => img.sequence === 1)?.url ||
                      item.images.find((img: any) => img.sequence === 0)?.url ||
                      "/placeholder-image.jpg"
                    }
                    title={`${item.name} - ${primaryVariant.name}`}
                    price={primaryVariant.price.$numberDecimal}
                    originalPrice={originalPrice}
                    discount={discount}
                    productId={item._id}
                    variantId={primaryVariant._id}
                    isInCart={item.inCart || false}
                    onRemove={() => removeFromWishlist(item._id)}
                  />
                );
              })
            ) : (
              <div className="text-center mt-12 md:mt-16 col-span-full">
                <Heart
                  size={80}
                  className="text-gray-200 mx-auto mb-6 animate-bounce"
                />
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Your Wishlist is Empty
                </h3>
                <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                  Start adding your favorite products to make it yours!
                </p>
              </div>
            )}
          </div>

          {/* Browse Products Button */}
          {!wishlist.length && (
            <div className="flex justify-center mt-10 md:mt-12">
              <Button
                className="bg-[#556b2f] hover:bg-[#405816]/90 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = "/products")}
              >
                Explore Products
              </Button>
            </div>
          )}
        </>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default WishlistPage;