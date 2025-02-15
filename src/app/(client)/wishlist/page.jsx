"use client";
import { Button } from "@/components/ui/button"; // shadcn Button
import { Skeleton } from "@/components/ui/skeleton"; // shadcn Skeleton for loading state
import { Heart, Trash2 } from "lucide-react"; // Icons
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // React Toastify
import "react-toastify/dist/ReactToastify.css"; // React Toastify CSS
import { deleteProductFromWishlistAPI, getWishListAPI } from "../../../apis/wishlistAPIs";

const WishlistItem = ({
    imageSrc,
    title,
    price,
    originalPrice,
}) => {
    return (
        <div className="flex bg-white border rounded-lg shadow-lg p-4 gap-4 items-center hover:shadow-xl transition duration-300">
            {/* Image Section */}
            <div className="w-24 h-24 relative flex-shrink-0">
                <img
                    src={imageSrc}
                    alt={title}
                    layout="fill"
                    className="rounded-lg object-cover"
                />
            </div>
            {/* Content Section */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 ">{title}</h3>
                <div className="flex items-center gap-3 mt-2">
                    <span className="text-green-600 font-bold">{price}</span>
                    <span className="text-gray-500 line-through">{originalPrice}</span>
                </div>
            </div>
        </div>
    );
};

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch wishlist data
    const getWishList = async () => {
        try {
            setLoading(true);
            const response = await getWishListAPI();
            if (response.data && response.data.data) {
                setWishlist(response.data.data.product_id);
            } else {
                setError("No data found in the wishlist.");
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
            toast.success("Product removed from wishlist!"); // Success toast
            getWishList(); // Refresh the wishlist after removal
        } catch (error) {
            toast.error("Failed to remove product. Please try again."); // Error toast
            console.error("Error removing product:", error);
        }
    };

    return (
        <div className="container mx-auto py-7 p-3">
            <h1 className="text-center text-2xl md:text-4xl font-bold">
                Your Wishlist
            </h1>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex bg-white border rounded-lg shadow-lg p-4 gap-4 items-center">
                            <Skeleton className="w-24 h-24 rounded-lg" /> {/* Image Skeleton */}
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-3/4" /> {/* Title Skeleton */}
                                <Skeleton className="h-4 w-1/2" /> {/* Price Skeleton */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="text-center mt-10">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Wishlist Items */}
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {wishlist.length > 0 ? (
                            wishlist.map((item, index) => (
                                <div key={index} className="relative">
                                    <WishlistItem
                                        imageSrc={item?.images[0]}
                                        title={item?.name}
                                        price={item?.price?.$numberDecimal}
                                        originalPrice={item?.price?.$numberDecimal + 10}
                                    />
                                    {/* Remove Item Button */}
                                    <button
                                        onClick={() => removeFromWishlist(item._id)} // Assuming each item has an _id
                                        className="absolute top-4 right-4 text-red-600 hover:scale-110 transition-all duration-300"
                                        aria-label="Remove from Wishlist"
                                    >
                                        <Trash2 size={24} /> {/* Using the Trash2 icon */}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-10 col-span-full">
                                <Heart size={64} className="text-gray-300 mx-auto mb-4" /> {/* Heart icon */}
                                <p className="text-gray-500">
                                    Your wishlist is empty. Start adding your favorite products!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* See All Products Button */}
                    <div className="flex justify-center mt-8">
                        <Button className="bg-[#2B0504] text-white px-6 py-3 hover:bg-[#3C0606] transition">
                            Browse Products
                        </Button>
                    </div>
                </>
            )}

            {/* React Toastify Container */}
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
            />
        </div>
    );
};

export default WishlistPage;