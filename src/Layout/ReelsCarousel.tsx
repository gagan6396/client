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

// Product interface aligned with previous artifacts
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

// Skeleton Card Component
const SkeletonVideoCard = () => (
  <Card className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
    <CardContent className="p-0">
      <div className="w-full aspect-square bg-gray-200 rounded-t-xl" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-3 w-3 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded-full flex-1" />
          <div className="h-5 w-5 bg-gray-200 rounded-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Product Card Component
const ProductCard = ({
  product,
  handleVideoClick,
  handleAddToCart,
  handleDeleteFromCart,
  handleAddToWishlist,
  handleDeleteFromWishlist,
}: {
  product: Product;
  handleVideoClick: (productId: string) => void;
  handleAddToCart: (productId: string, variantId: string) => void;
  handleDeleteFromCart: (productId: string, variantId: string) => void;
  handleAddToWishlist: (productId: string) => void;
  handleDeleteFromWishlist: (productId: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const router = useRouter();

  const primaryImage =
    product.images?.find((img) => img.sequence === 0)?.url ||
    "/placeholder-image.jpg";
  const secondaryImage =
    product.images?.find((img) => img.sequence === 1)?.url || primaryImage;

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
    <Card
      className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden cursor-pointer">
          {product.video ? (
            <video
              src={product.video}
              className="w-full aspect-square object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
              muted
              autoPlay
              loop
              playsInline
              title={`${product.name} Video`}
              onClick={() => handleVideoClick(product._id)}
            />
          ) : (
            <img
              src={hovered ? secondaryImage : primaryImage}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-t-xl transition-all duration-300"
              onClick={() => handleVideoClick(product._id)}
            />
          )}
          {product.isBestSeller && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              Best Seller
            </div>
          )}
          {isDiscountActive && discountPercentage > 0 && (
            <div className="absolute top-2 left-2 mt-8 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              -{discountPercentage}% (₹{discountAmount.toFixed(2)})
            </div>
          )}
          <div
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
            onClick={
              product.inWishlist
                ? () => handleDeleteFromWishlist(product._id)
                : () => handleAddToWishlist(product._id)
            }
          >
            {product.inWishlist ? (
              <FaHeart className="text-red-500 hover:text-red-600 transition-all cursor-pointer" />
            ) : (
              <CiHeart className="text-gray-500 hover:text-red-500 transition-all cursor-pointer" />
            )}
          </div>
        </div>
        <div className="p-3 space-y-2">
          <h3
            className="text-gray-800 text-sm font-medium group-hover:text-green-700 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-3 w-3 ${
                  index < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.372 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.147 9.101c-.784-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant._id}
                className={`text-xs px-2 py-1 rounded-full border ${
                  selectedVariant._id === variant._id
                    ? "bg-green-100 border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.weight}kg
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-green-600 font-bold text-sm">
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
              product.inCart
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#7A6E18] text-white hover:bg-[#7A6E18]/90"
            }`}
            onClick={
              product.inCart
                ? () => handleDeleteFromCart(product._id, selectedVariant._id)
                : () => handleAddToCart(product._id, selectedVariant._id)
            }
          >
            {product.inCart ? "Remove" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function ProductsVideoCarousel() {
  const [productsWithVideos, setProductsWithVideos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsAPI();
        const products = response.data.data.products || [];
        const videoProducts = products.filter((product: Product) => product.video);
        setProductsWithVideos(videoProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string, variantId: string) => {
    try {
      const response = await addToCartAPI({
        productId,
        variantId,
        quantity: 1,
      });
      const updatedProducts = productsWithVideos.map((p) =>
        p._id === productId ? { ...p, inCart: true } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item added to cart!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
    }
  };

  const handleDeleteFromCart = async (productId: string, variantId: string) => {
    try {
      const response = await deleteToCartAPI({ productId, variantId });
      const updatedProducts = productsWithVideos.map((p) =>
        p._id === productId ? { ...p, inCart: false } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item removed from cart!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from cart. Try again later."
      );
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addToWishListAPI(productId);
      const updatedProducts = productsWithVideos.map((p) =>
        p._id === productId ? { ...p, inWishlist: true } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item added to wishlist!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
    }
  };

  const handleDeleteFromWishlist = async (productId: string) => {
    try {
      const response = await deleteProductFromWishlistAPI(productId);
      const updatedProducts = productsWithVideos.map((p) =>
        p._id === productId ? { ...p, inWishlist: false } : p
      );
      setProductsWithVideos(updatedProducts);
      toast.success(response.data.message || "Item removed from wishlist!");
    } catch (error: any) {
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
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
        Featured Product Videos
      </h2>
      <main className="container mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <SkeletonVideoCard key={index} />
            ))}
          </div>
        ) : productsWithVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">
              No product videos available yet. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productsWithVideos.slice(0, 6).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleVideoClick={handleVideoClick}
                handleAddToCart={handleAddToCart}
                handleDeleteFromCart={handleDeleteFromCart}
                handleAddToWishlist={handleAddToWishlist}
                handleDeleteFromWishlist={handleDeleteFromWishlist}
              />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}

export default ProductsVideoCarousel;