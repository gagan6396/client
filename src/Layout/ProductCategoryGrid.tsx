"use client";

import { addToCartAPI, deleteToCartAPI } from "@/apis/addToCartAPIs";
import { getCategoriesAPI } from "@/apis/categoriesAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

// Updated Product interface based on new data structure
interface Product {
  _id: string;
  supplier_id: {
    shop_address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    _id: string;
    email: string;
    phone: string;
    shop_name: string;
  };
  category_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  subcategory_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  reviews: any[];
  name: string;
  description: string;
  variants: {
    dimensions: {
      height: number;
      length: number;
      width: number;
    };
    discount: {
      type?: string;
      value?: number;
      active: boolean;
      startDate?: string;
      endDate?: string;
    };
    name: string;
    price: { $numberDecimal: string };
    stock: number;
    weight: number;
    sku: string;
    images: string[];
    _id: string;
  }[];
  images: {
    url: string;
    sequence: number;
    _id: string;
  }[];
  video: string | null;
  rating: number;
  brand: string;
  isBestSeller: boolean;
  createdAt: string;
  inWishlist: boolean;
  inCart: boolean;
}

// Category interface
interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images?: string[];
}

// Skeleton Card for Products
const SkeletonCard = () => (
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

// Skeleton Card for Categories
const SkeletonCategoryCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center p-4 animate-pulse">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-300 rounded w-1/2" />
  </div>
);

// ProductCard Component
interface ProductCardProps {
  images: { url: string; sequence: number }[]; // Updated to accept an array of images
  title: string;
  price: string;
  originalPrice: number;
  isBestSeller: boolean;
  productId: string;
  variantId: string;
  inWishlist: boolean;
  inCart: boolean;
  discount?: {
    type?: string;
    value?: number;
    active: boolean;
    startDate?: string;
    endDate?: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({
  images,
  title,
  price,
  originalPrice,
  isBestSeller,
  productId,
  variantId,
  inWishlist,
  inCart,
  discount,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);
  const [isInCart, setIsInCart] = useState(inCart);
  const [hovered, setHovered] = useState(false); // State to track hover
  const navigation = useRouter();

  const primaryImage =
    images?.find((img) => img.sequence === 0)?.url || "/placeholder-image.jpg";
  const secondaryImage =
    images?.find((img) => img.sequence === 1)?.url || primaryImage;

  const addToWishList = async () => {
    try {
      const response = await addToWishListAPI(productId);
      setIsInWishlist(true);
      toast.success(response?.data?.message || "Item added to wishlist!");
    } catch (error: any) {
      console.error("Error adding to wishlist:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
    }
  };

  const deleteProductFromWishlist = async () => {
    try {
      const response = await deleteProductFromWishlistAPI(productId);
      setIsInWishlist(false);
      toast.success(response?.data?.message || "Item removed from wishlist!");
    } catch (error: any) {
      console.error("Error removing from wishlist:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove item from wishlist. Try again later."
      );
    }
  };

  const addToCart = async () => {
    try {
      const response = await addToCartAPI({
        productId,
        variantId,
        quantity: 1,
      });
      setIsInCart(true);
      toast.success(response?.data?.message || "Item added to cart!");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
    }
  };

  const deleteToCart = async () => {
    try {
      const response = await deleteToCartAPI({ productId, variantId });
      setIsInCart(false);
      toast.success(response?.data?.message || "Item removed from cart!");
    } catch (error: any) {
      console.error("Error removing from cart:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove item from cart. Try again later."
      );
    }
  };

  const currentDate = new Date();
  const isDiscountActive =
    discount?.active &&
    (!discount.startDate || new Date(discount.startDate) <= currentDate) &&
    (!discount.endDate || new Date(discount.endDate) >= currentDate);
  const discountPercentage = isDiscountActive ? discount?.value : 0;

  return (
    <div
      className="group bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => navigation.push(`/products/${productId}`)}
      >
        <img
          src={hovered ? secondaryImage : primaryImage}
          alt={title || "Product Image"}
          className="w-full aspect-square object-cover rounded-t-2xl transition-all duration-500"
        />
        {isBestSeller && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </div>
        )}
        {isDiscountActive && discountPercentage && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            -{discountPercentage}%
          </div>
        )}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="p-4 md:p-6 space-y-3">
        <h3 className="text-gray-800 text-base md:text-lg font-semibold line-clamp-1 group-hover:text-green-700 transition-colors">
          {title || "Unnamed Product"}
        </h3>
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
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-green-600 font-bold text-lg md:text-xl">
              ₹{price || "N/A"}
            </span>
            <span className="text-gray-400 line-through text-sm md:text-base">
              ₹{originalPrice || "N/A"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            className={`flex-1 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
              isInCart
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#7A6E18] text-white hover:bg-[#7A6E18]"
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

// Main Component
const ProductCategories: React.FC = () => {
  const navigate = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const categoryResponse = await getCategoriesAPI();
      setCategories(categoryResponse?.data?.data || []);

      const productsResponse = await getProductsAPI();
      setProducts(productsResponse?.data?.data?.products || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to load products and categories. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">{error}</p>
          <Button
            onClick={fetchData}
            className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      {/* Top Products Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl text-center font-extrabold text-gray-900 mb-10 tracking-tight">
            Our Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {loading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : products.slice(45, 55).map((product) => {
                  const firstVariant = product.variants?.[0];
                  return (
                    <ProductCard
                      key={product._id}
                      images={product.images} // Pass the full images array
                      title={product.name || "Unnamed Product"}
                      price={firstVariant?.price?.$numberDecimal || "N/A"}
                      originalPrice={
                        parseFloat(firstVariant?.price?.$numberDecimal || "0") +
                        10
                      }
                      isBestSeller={product.isBestSeller}
                      productId={product._id}
                      variantId={firstVariant?._id || ""}
                      inWishlist={product.inWishlist}
                      inCart={product.inCart}
                      discount={firstVariant?.discount}
                    />
                  );
                })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products">
              <Button className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProductCategories;
