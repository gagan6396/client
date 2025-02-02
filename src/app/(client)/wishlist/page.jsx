"use client";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react"; // Importing icons from react-lucide
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getWishListAPI } from "../../../apis/wishlistAPIs";



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
                <Image
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

    const getWishList = async () => {
        try {
            const response = await getWishListAPI()
            setWishlist(response.data.data.product_id)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getWishList()
    }, [])

    // Function to remove an item from the wishlist
    const removeFromWishlist = (index) => {
        setWishlist((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="container mx-auto py-7 p-3">
            <h1 className="text-center text-2xl md:text-4xl font-bold">
                Your Wishlist
            </h1>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {wishlist.length > 0 && wishlist.map((item, index) => (
                    <div key={index} className="relative">
                        <WishlistItem
                            imageSrc={item?.images[0]}
                            title={item?.name}
                            price={item?.price?.$numberDecimal}
                            originalPrice={item?.price?.$numberDecimal + 10}
                        />
                        {/* Remove Item Button */}
                        <button
                            onClick={() => removeFromWishlist(index)}
                            className="absolute top-4 right-4 text-red-600 hover:scale-110 transition-all duration-300"
                            aria-label="Remove from Wishlist"
                        >
                            <Trash2 size={24} /> {/* Using the Trash2 icon */}
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty Wishlist Message */}
            {wishlist.length === 0 && (
                <div className="text-center mt-10">
                    <Heart size={64} className="text-gray-300 mx-auto mb-4" /> {/* Heart icon */}
                    <p className="text-gray-500">
                        Your wishlist is empty. Start adding your favorite products!
                    </p>
                </div>
            )}

            {/* See All Products Button */}
            <div className="flex justify-center mt-8">
                <Button className="bg-[#2B0504] text-white px-6 py-3 hover:bg-[#3C0606] transition">
                    Browse Products
                </Button>
            </div>
        </div>
    );
};

export default WishlistPage;
