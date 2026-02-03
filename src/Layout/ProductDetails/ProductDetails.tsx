"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

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
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v._id === selectedVariantId) ||
      product.variants?.[0] ||
      null
  );

  // Calculate discount and pricing for the selected variant
  const currentDate = new Date();
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
    setSelectedVariantId(variant?._id ?? null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white">
      {/* Product Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <div className="h-1 w-16 bg-[#556b2f] mb-4"></div>
        
        {/* Brand and Rating */}
        <div className="flex items-center gap-4 mb-4">
          {product.brand && (
            <span className="text-sm text-gray-600">Brand: {product.brand}</span>
          )}
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-sm text-gray-700 ml-1">{product.rating.toFixed(1)}</span>
            {product.reviews && product.reviews.length > 0 && (
              <span className="text-sm text-gray-500 ml-1">
                ({product.reviews.length} reviews)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-8 p-4 sm:p-0 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center  gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl sm:text-4xl font-bold text-[#556b2f]">
              ₹{displayPrice}
            </span>
            {isDiscountActive && discountValue > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-400 line-through">
                  ₹{displayOriginalPrice}
                </span>
                <Badge className="bg-[#556b2f] text-white">
                  Save {discountValue}%
                </Badge>
              </div>
            )}
          </div>
          
          {/* Stock Status */}
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
            displayStock > 10 
              ? "bg-green-100 text-green-800" 
              : displayStock > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}>
            {displayStock > 10 
              ? "In Stock" 
              : displayStock > 0
              ? `Only ${displayStock} left`
              : "Out of Stock"}
          </div>
        </div>
      </div>

      {/* Variant Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            {product.variants.length > 1 ? "Choose Option" : "Available In"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.variants.map((variant) => {
              const variantPrice = parseFloat(variant.price.$numberDecimal);
              const isSelected = selectedVariant?._id === variant._id;
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
                <button
                  key={variant._id}
                  onClick={() => handleVariantChange(variant)}
                  disabled={variant.stock === 0}
                  className={`
                    relative p-4 border-2 rounded-lg text-left transition-all duration-200
                    ${isSelected 
                      ? 'border-[#ae5708]' 
                      : 'border-gray-200 hover:border-gray-400'
                    }
                    ${variant.stock === 0 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}
                  `}
                >
                  {/* Variant Name */}
                  <div className="font-semibold text-gray-900 mb-2">{variant.name}</div>
                  
                  {/* Price */}
                  <div className="mb-2">
                    <div className="text-lg font-bold text-gray-900">
                      ₹{variantPrice.toFixed(2)}
                    </div>
                    {variantIsDiscountActive && variantDiscountValue > 0 && (
                      <div className="text-sm text-gray-400 line-through">
                        ₹{variantOriginalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="text-sm text-gray-600 space-y-1">
                    {variant.weight > 0 && (
                      <div>Weight: {variant.weight} kg</div>
                    )}
                    <div className="flex justify-between">
                      <span>Stock:</span>
                      <span className={`font-medium ${
                        variant.stock > 10 
                          ? "text-green-600" 
                          : variant.stock > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                        {variant.stock > 10 
                          ? "Available" 
                          : variant.stock > 0
                          ? `${variant.stock} left`
                          : "Out of stock"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#556b2f] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Description */}
      {/* <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Product Description
        </h3>
        <div
          className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div> */}

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Add to Cart Button */}
          <Button
            onClick={addToCart}
            disabled={product.inCart || displayStock <= 0}
            className={`flex-1 h-12 text-base font-medium ${
              product.inCart || displayStock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#556b2f] hover:bg-[#4b6321] text-white"
            }`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.inCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          
          {/* Buy Now Button */}
          <Button
            onClick={buyNow}
            disabled={displayStock <= 0}
            className={`flex-1 h-12 text-base font-medium ${
              displayStock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            Buy Now
          </Button>
          
          {/* Wishlist Button */}
          {/* <Button
            variant="outline"
            className="h-12 w-12 p-0 border-2 border-gray-300"
            onClick={product.inWishlist ? deleteProductFromWishlist : addToWishList}
          >
            {product.inWishlist ? (
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            ) : (
              <Heart className="h-5 w-5 text-gray-600" />
            )}
          </Button> */}
        </div>
      </div>

      {/* Additional Information */}
      {/* <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="text-sm font-semibold text-gray-900">Free Shipping</div>
          <div className="text-sm text-gray-600">Above ₹499</div>
        </div>
        <div className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="text-sm font-semibold text-gray-900">Easy Returns</div>
          <div className="text-sm text-gray-600">30 Days Policy</div>
        </div>
      </div> */}

      {/* Category Information */}
      {/* <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {product.category_id && (
            <Badge variant="secondary" className="px-3 py-1.5 bg-gray-100 text-gray-800">
              {typeof product.category_id === "string" 
                ? product.category_id 
                : product.category_id.name}
            </Badge>
          )}
          
          {product.subcategory_id && (
            <Badge variant="secondary" className="px-3 py-1.5 bg-gray-100 text-gray-800">
              {typeof product.subcategory_id === "string" 
                ? product.subcategory_id 
                : product.subcategory_id.name}
            </Badge>
          )}
          
          {product.isBestSeller && (
            <Badge variant="secondary" className="px-3 py-1.5 bg-red-100 text-red-800">
              Best Seller
            </Badge>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetails;