"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteProductFromWishlistAPI, getWishListAPI } from "../../../apis/wishlistAPIs";

const WishlistItem = ({ imageSrc, title, price, originalPrice, onRemove }) => {
  return (
    <div className="group flex bg-white rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Image Section */}
      <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Content Section */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
            <span className="text-green-600 font-bold text-sm md:text-base">
              ₹{price}
            </span>
            <span className="text-gray-400 line-through text-xs md:text-sm">
              ₹{originalPrice}
            </span>
          </div>
        </div>
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300"
          aria-label="Remove from Wishlist"
        >
          <Trash2 size={20} className="md:size-7" />
        </button>
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError("Failed to fetch wishlist. Please try again later.");
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await deleteProductFromWishlistAPI(productId);
      toast.success("Item removed from wishlist!", { icon: "❤️" });
      getWishList(); // Refresh the wishlist
    } catch (error) {
      toast.error("Failed to remove item. Please try again.");
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 md:mb-14 tracking-tight">
        Your Wishlist
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex bg-white rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 items-center animate-pulse"
            >
              <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-lg" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center mt-12 md:mt-16">
          <Heart size={80} className="text-gray-200 mx-auto mb-6 animate-pulse" />
          <p className="text-lg md:text-xl text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Wishlist Items */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
            {wishlist.length > 0 ? (
              wishlist.map((item, index) => (
                <WishlistItem
                  key={index}
                  imageSrc={item?.images[0]}
                  title={item?.name}
                  price={item?.price?.$numberDecimal}
                  originalPrice={item?.price?.$numberDecimal + 10}
                  onRemove={() => removeFromWishlist(item._id)}
                />
              ))
            ) : (
              <div className="text-center mt-12 md:mt-16 col-span-full">
                <Heart size={80} className="text-gray-200 mx-auto mb-6 animate-bounce" />
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
                className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = "/products"}
              >
                Explore Products
              </Button>
            </div>
          )}
        </>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
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