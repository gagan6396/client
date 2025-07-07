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
import { useEffect, useState } from "react";
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
  const navigation = useRouter();

  const primaryImage =
    images?.find((img) => img.sequence === 0)?.url || "/placeholder-image.jpg";
  const secondaryImage =
    images?.find((img) => img.sequence === 1)?.url || primaryImage;

  const addToWishList = async () => {
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

  const deleteProductFromWishlist = async () => {
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

  const addToCart = async () => {
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

  const deleteToCart = async () => {
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

  return (
    <div
      className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 border border-gray-100 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden cursor-pointer">
        <img
          src={hovered ? secondaryImage : primaryImage}
          alt={title}
          className="w-full aspect-square object-cover rounded-t-xl transition-all duration-300"
          onClick={() => navigation.push(`/products/${productId}`)}
        />
        {isBestSeller && (
          <div className="absolute top-2 left-2 bg-[#7A6E18] text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            Best Seller
          </div>
        )}
        {isDiscountActive && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 mt-8 bg-[#7A6E18]/90 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            -{discountPercentage}% (₹{discountAmount.toFixed(2)})
          </div>
        )}
        <div
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
          onClick={isInWishlist ? deleteProductFromWishlist : addToWishList}
        >
          {isInWishlist ? (
            <FaHeart className="text-[#7A6E18] hover:opacity-90 transition-all cursor-pointer" />
          ) : (
            <CiHeart className="text-gray-500 hover:text-[#7A6E18] transition-all cursor-pointer" />
          )}
        </div>
      </div>

      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3
            className="text-gray-800 text-sm font-medium group-hover:text-[#7A6E18] transition-colors line-clamp-2"
            title={title}
          >
            {title}
          </h3>

          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-3 w-3 ${
                  index < Math.round(rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.372 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.147 9.101c-.784-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({rating.toFixed(1)})
            </span>
          </div>

          <div className="flex flex-wrap gap-1 min-h-[28px]">
            {variants.map((variant) => (
              <button
                key={variant._id}
                className={`text-xs px-2 py-1 rounded-full border ${
                  selectedVariant._id === variant._id
                    ? "bg-[#7A6E18]/10 border-[#7A6E18]"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.name}
              </button>
            ))}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-[#7A6E18] font-bold text-sm">
              ₹{finalPrice.toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <span className="text-gray-400 line-through text-xs">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button
          className={`w-full rounded-full text-xs font-medium transition-all ${
            isInCart
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[#7A6E18] text-white hover:bg-[#7A6E18]/90"
          }`}
          onClick={isInCart ? deleteToCart : addToCart}
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </Button>
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
          <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-6">
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
                      isBestSeller={product.isBestSeller} // Set to true for popular products
                      productId={product._id}
                      inWishlist={product.inWishlist}
                      inCart={product.inCart}
                    />
                  ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button className="bg-[#7A6E18] text-white hover:bg-[#7A6E18] px-6 py-2 rounded-full">
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
