import React from "react";
import Image, { StaticImageData } from "next/image";
import Product1Image from "@/public/product-1.png";
import Product2Image from "@/public/product-2.png";
import Product3Image from "@/public/product-3.png";
import Product4Image from "@/public/product-4.png";
import Product5Image from "@/public/product-5.png";
import Product6Image from "@/public/product-6.png";
import Product7Image from "@/public/product-7.png";
import Product8Image from "@/public/product-8.png";

// Adjust the type to accept either StaticImageData or string
type ProductCardProps = {
  imageSrc: StaticImageData | string; // Allow imported images or external URLs
  title: string;
  price: string;
  originalPrice: string;
  isBestSeller: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  originalPrice,
  isBestSeller,
}) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 group">
      {/* Badge and Image */}
      <div className="relative">
        {isBestSeller && (
          <div className="absolute top-2 right-2 bg-red-800 text-white text-xs px-2 py-1 rounded">
            Best Seller
          </div>
        )}
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="mt-4 text-center">
        <h3 className="text-gray-800 text-lg font-semibold">{title}</h3>
        <div className="flex items-center justify-between mt-2 space-x-4">
          {/* Price and Original Price */}
          <div>
            <span className="text-green-600 font-bold">{price}</span>
            <span className="text-gray-500 line-through ml-2">{originalPrice}</span>
          </div>
          {/* 5-star Rating */}
          <div className="flex space-x-1">
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
        </div>
        <button className="mt-4 bg-[#2B0504] text-white px-4 py-2 rounded-lg hover:bg-[#3C0606] transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

const ProductCategoryGrid: React.FC = () => {
  const products = [
    {
      imageSrc: Product1Image,
      title: "Mixed Sweets",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product2Image,
      title: "Gir Cow Pure Vedic Ghee 500 ml",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product3Image,
      title: "Buransh Tea 30 gms",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product4Image,
      title: "Rotana 500 gms",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product5Image,
      title: "Makki Nachos",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product6Image,
      title: "Normal MP Atta",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product7Image,
      title: "Gujiyas",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
    {
      imageSrc: Product8Image,
      title: "Chamomile Tea",
      price: "₹118.75",
      originalPrice: "₹125.00",
      isBestSeller: true,
    },
  ];

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {/* See All Products Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-[#2B0504] text-white px-6 py-3 hover:bg-[#3C0606] transition">
          See All Our Products
        </button>
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
