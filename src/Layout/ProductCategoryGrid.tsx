"use client";

import { addToCartAPI, deleteToCartAPI } from "@/apis/addToCartAPIs";
import { getProductsAPI } from "@/apis/productsAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

// Product interface
interface Product {
  _id: string;
  supplier_id: {
    shop_name: string;
  };
  category_id: {
    name: string;
  };
  subcategory_id: {
    name: string;
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

// Skeleton Card for Products
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
    <div className="w-full aspect-square bg-gray-200 rounded-t-xl" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-3 bg-gray-200 rounded-full" />
        ))}
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded-full flex-1" />
        <div className="h-5 w-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

// ProductCard Component
interface ProductCardProps {
  images: { url: string; sequence: number }[];
  title: string;
  variants: Product["variants"];
  rating: number;
  isBestSeller: boolean;
  productId: string;
  inWishlist: boolean;
  inCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  images,
  title,
  variants,
  rating,
  isBestSeller,
  productId,
  inWishlist,
  inCart,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);
  const [isInCart, setIsInCart] = useState(inCart);
  const [hovered, setHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useRouter();
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const buttonRefDesktop = useRef<HTMLButtonElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);
  const buttonRefMobile = useRef<HTMLButtonElement>(null);

  const primaryImage =
    images?.find((img) => img.sequence === 0)?.url || "/placeholder-image.jpg";
  const secondaryImage =
    images?.find((img) => img.sequence === 1)?.url || primaryImage;

  const handleProductClick = () => {
    navigation.push(`/products/${productId}`);
  };

  const addToWishList = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    try {
      const response = await addToWishListAPI(productId);
      setIsInWishlist(true);
      toast.success(response?.data?.message || "Added to wishlist!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to add to wishlist."
      );
    }
  };

  const deleteProductFromWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    try {
      const response = await deleteProductFromWishlistAPI(productId);
      setIsInWishlist(false);
      toast.success(response?.data?.message || "Removed from wishlist!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to remove from wishlist."
      );
    }
  };

  const addToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    try {
      const response = await addToCartAPI({
        productId,
        variantId: selectedVariant._id,
        quantity: 1,
      });
      setIsInCart(true);
      toast.success(response?.data?.message || "Added to cart!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add to cart.");
    }
  };

  const deleteToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    try {
      const response = await deleteToCartAPI({
        productId,
        variantId: selectedVariant._id,
      });
      setIsInCart(false);
      toast.success(response?.data?.message || "Removed from cart!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to remove from cart."
      );
    }
  };

  const handleVariantSelect = (variantId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    const variant = variants.find((v) => v._id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      setShowDropdown(false);
    }
  };

  const handleVariantButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    setShowDropdown(!showDropdown);
  };

  const currentDate = new Date();
  const isDiscountActive =
    selectedVariant.discount?.active &&
    (!selectedVariant.discount.startDate ||
      new Date(selectedVariant.discount.startDate) <= currentDate) &&
    (!selectedVariant.discount.endDate ||
      new Date(selectedVariant.discount.endDate) >= currentDate);
  const discountPercentage = isDiscountActive
    ? selectedVariant.discount?.value || 0
    : 0;
  const originalPrice = parseFloat(selectedVariant.price.$numberDecimal);
  const discountAmount = discountPercentage
    ? (originalPrice * discountPercentage) / 100
    : 0;
  const finalPrice = originalPrice - discountAmount;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickOutsideDesktop = dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(event.target as Node) &&
        buttonRefDesktop.current &&
        !buttonRefDesktop.current.contains(event.target as Node);
      
      const isClickOutsideMobile = dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(event.target as Node) &&
        buttonRefMobile.current &&
        !buttonRefMobile.current.contains(event.target as Node);

      if (isClickOutsideDesktop && isClickOutsideMobile) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowDropdown(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm overflow-visible transition-all hover:shadow-2xl hover:-translate-y-1 duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={handleProductClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-50 rounded-t-2xl">
        <img
          src={hovered ? secondaryImage : primaryImage}
          alt={title}
          className="w-full bg-amber-100 aspect-square object-contain transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isBestSeller && (
         <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-amber-300">
         Best Seller
       </div>
        )}
        {isDiscountActive && discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {discountPercentage}% OFF
          </div>
        )}
        <div
          className="absolute bottom-3 right-3 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95"
          onClick={isInWishlist ? deleteProductFromWishlist : addToWishList}
        >
          {isInWishlist ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <CiHeart className="text-gray-700 hover:text-red-500 transition-all text-lg" />
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col relative">
        {/* Product Title */}
        <h3
          className="text-gray-800 font-medium text-sm leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4"
          title={title}
        >
          {title}
        </h3>

        {/* Price and Variant Dropdown Section */}
        <div className="space-y-3 mb-4">
          {/* Price Section - Full width on mobile, split on desktop */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-amber-800 text-md tracking-tight">
                  ₹{finalPrice.toFixed(2)}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-gray-400 line-through text-sm font-medium">
                      ₹{originalPrice.toFixed(2)}
                    </span>
                    <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-0.5 rounded-full">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              {/* Stock Indicator */}
              <div
                className={`text-xs font-medium mt-1.5 ${
                  selectedVariant.stock > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {selectedVariant.stock > 0
                  ? `${selectedVariant.stock} in stock`
                  : "Out of stock"}
              </div>
            </div>

            {/* Variant Dropdown Button - Hidden on mobile, shown on desktop */}
            <div className="relative flex-shrink-0 hidden md:block">
              <button
                ref={buttonRefDesktop}
                onClick={handleVariantButtonClick}
                className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 hover:shadow-sm bg-white transition-all min-w-[80px] max-w-[120px] relative z-20"
                title={selectedVariant.name}
              >
                <span className="truncate text-left flex-1">
                  {selectedVariant.name}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 flex-shrink-0 ml-1 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu - Desktop only */}
              {showDropdown && (
                <div
                  ref={dropdownRefDesktop}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-48 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()} // Prevent product card click
                >
                  {variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={(e) => handleVariantSelect(variant._id, e)}
                      className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 truncate transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        variant._id === selectedVariant._id
                          ? "bg-gray-100 font-semibold text-[#705a2b]"
                          : "font-medium text-gray-700"
                      }`}
                      title={variant.name}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Variant Dropdown - Below price section */}
          <div className="md:hidden">
            <div className="relative z-10">
              <button
                ref={buttonRefMobile}
                onClick={handleVariantButtonClick}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-sm bg-white transition-all"
                title={selectedVariant.name}
              >
                <span className="truncate">{selectedVariant.name}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu - Mobile only */}
              {showDropdown && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(false);
                    }}
                  />
                  
                  <div
                    ref={dropdownRefMobile}
                    className="fixed inset-x-4 bottom-4 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent product card click
                  >
                    {variants.map((variant) => (
                      <button
                        key={variant._id}
                        onClick={(e) => handleVariantSelect(variant._id, e)}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 truncate transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          variant._id === selectedVariant._id
                            ? "bg-gray-100 font-semibold text-[#705a2b]"
                            : "font-medium text-gray-700"
                        }`}
                        title={variant.name}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto">
        <Button
  className={`w-full rounded-lg py-3 text-sm font transition-all transform active:scale-95 shadow-sm ${
    isInCart
      ? "bg-red-500 text-white hover:bg-red-600 hover:shadow-md"
      : "bg-[#2d5437] text-white hover:bg-[#204429] hover:shadow-md"
  } ${
    selectedVariant.stock === 0
      ? "opacity-60 cursor-not-allowed"
      : ""
  }`}
  onClick={isInCart ? deleteToCart : addToCart}
  disabled={selectedVariant.stock === 0}
>
  {isInCart
    ? "Remove from Cart"
    : selectedVariant.stock === 0
    ? "Out of Stock"
    : "Add to cart"}
</Button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ProductCategories: React.FC = () => {
  const navigate = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsResponse = await getProductsAPI();
      setProducts(productsResponse?.data?.data?.products || []);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to load products. Please try again later.";
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
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={fetchData}
            className="bg-[#7A6E18] text-white hover:bg-[#7A6E18] px-6 py-2 rounded-full"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-8">
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl text-center font-bold text-[#2d5437] mb-6">
            Our Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : products
                  .filter((item) => !item.isBestSeller)
                  .slice(0, 12)
                  .map((product) => (
                    <ProductCard
                      key={product._id}
                      images={product.images}
                      title={product.name}
                      variants={product.variants}
                      rating={product.rating}
                      isBestSeller={product.isBestSeller}
                      productId={product._id}
                      inWishlist={product.inWishlist}
                      inCart={product.inCart}
                    />
                  ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button className="bg-[#b97341] text-white hover:bg-[#793f09] px-6 py-2 rounded-full">
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