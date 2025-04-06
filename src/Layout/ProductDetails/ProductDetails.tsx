"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface ProductDetailsProps {
  product: Product;
  addToCart: () => void;
  buyNow: () => void;
  addToWishList: () => void;
  deleteProductFromWishlist: () => void;
  subCategoryProducts: Product[];
  selectedVariantId: string | null;
  setSelectedVariantId: (variantId: string | null) => void;
}

const ProductDetails = ({
  product,
  addToCart,
  buyNow,
  addToWishList,
  deleteProductFromWishlist,
  subCategoryProducts,
  selectedVariantId,
  setSelectedVariantId,
}: ProductDetailsProps) => {
  const router = useRouter();

  // Set initial selected variant based on selectedVariantId or default to first variant
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v._id === selectedVariantId) ||
      product.variants?.[0] ||
      null
  );

  // Calculate discount and pricing for the selected variant
  const currentDate = new Date("2025-03-17"); // Fixed date for consistency
  const isDiscountActive =
    selectedVariant?.discount?.active &&
    (!selectedVariant.discount.startDate ||
      new Date(selectedVariant.discount.startDate) <= currentDate) &&
    (!selectedVariant.discount.endDate ||
      new Date(selectedVariant.discount.endDate) >= currentDate);
  const price = parseFloat(selectedVariant?.price.$numberDecimal || "0");
  const discountValue = isDiscountActive ? selectedVariant?.discount?.value || 0 : 0;
  const originalPrice = discountValue ? price / (1 - discountValue / 100) : price;
  const displayPrice = price.toFixed(2);
  const displayOriginalPrice = originalPrice.toFixed(2);
  const displayStock = selectedVariant?.stock ?? 0;

  // Handle variant selection
  const handleVariantChange = (variant: typeof selectedVariant) => {
    setSelectedVariant(variant);
    setSelectedVariantId(variant?._id ?? null); // Sync with parent state
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-6">
      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Price and Stock Status */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-baseline gap-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600">
            ₹{displayPrice}
          </p>
          {isDiscountActive && discountValue > 0 && (
            <p className="text-sm sm:text-base text-gray-500 line-through">
              ₹{displayOriginalPrice}
            </p>
          )}
        </div>
        {isDiscountActive && discountValue > 0 && (
          <Badge variant="outline" className="bg-green-100 text-green-800 text-xs sm:text-sm">
            {discountValue}% off
          </Badge>
        )}
        <Badge
          variant="outline"
          className={`text-xs sm:text-sm ${
            displayStock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {displayStock > 0 ? `In Stock (${displayStock})` : "Out of Stock"}
        </Badge>
      </div>

      {/* Variant Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
            Select Variant:
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => {
              const variantPrice = parseFloat(variant.price.$numberDecimal);
              const variantIsDiscountActive =
                variant.discount?.active &&
                (!variant.discount.startDate ||
                  new Date(variant.discount.startDate) <= currentDate) &&
                (!variant.discount.endDate ||
                  new Date(variant.discount.endDate) >= currentDate);
              const variantDiscountValue = variantIsDiscountActive
                ? variant.discount?.value || 0
                : 0;
              const variantOriginalPrice = variantDiscountValue
                ? variantPrice / (1 - variantDiscountValue / 100)
                : variantPrice;

              return (
                <Button
                  key={variant._id}
                  variant={
                    selectedVariant?._id === variant._id ? "default" : "outline"
                  }
                  className={`text-xs sm:text-sm px-3 py-1 ${
                    selectedVariant?._id === variant._id
                      ? "bg-green-600 text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => handleVariantChange(variant)}
                >
                  {variant.name} - ₹{variantPrice.toFixed(2)}
                  {/* {variantIsDiscountActive && variantDiscountValue > 0 && (
                    <span className="ml-1 text-gray-500 line-through">
                      ₹{variantOriginalPrice.toFixed(2)}
                    </span>
                  )} */}
                  {variant.weight ? ` (${variant.weight}kg)` : ""}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Description */}
      <div
        className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed line-clamp-2 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm md:text-base transition-transform transform hover:scale-105 rounded-full shadow-lg"
          onClick={addToCart}
          disabled={product.inCart || displayStock <= 0}
        >
          <AiOutlineShoppingCart className="mr-1 sm:mr-2" />
          {product.inCart ? "Added to Cart" : "Add to Cart"}
        </Button>
        <Button
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base transition-transform transform hover:scale-105 rounded-full shadow-lg"
          onClick={buyNow}
          disabled={displayStock <= 0}
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base transition-transform transform hover:scale-105 rounded-full shadow-lg"
          onClick={
            product.inWishlist ? deleteProductFromWishlist : addToWishList
          }
        >
          {product.inWishlist ? (
            <FaHeart className="mr-1 sm:mr-2 text-red-600" />
          ) : (
            <CiHeart className="mr-1 sm:mr-2 text-gray-400 hover:text-red-600" />
          )}
          {product.inWishlist ? "In Wishlist" : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;