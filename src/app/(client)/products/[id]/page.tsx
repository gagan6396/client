"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addToCartAPI } from "@/apis/addToCartAPIs";
import { getProductBySubCategoryAPI } from "@/apis/categoriesAPIs";
import { getProductByIdAPI } from "@/apis/productsAPIs";
import { addReviewAPI, getAllReviewsByProduct } from "@/apis/reviewAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import ProductDescriptionAndDetails from "@/Layout/ProductDetails/ProductDescriptionAndDetails";
import ProductDetails from "@/Layout/ProductDetails/ProductDetails";
import ProductImageCarousel from "@/Layout/ProductDetails/ProductImageCarousel";
import ReviewsSection from "@/Layout/ProductDetails/ReviewsSection";
import SupplierDetails from "@/Layout/ProductDetails/SupplierDetails";
import { Product, Review } from "@/types";

// Skeleton for Reviews Section
const SkeletonReviewsSection = () => (
  <div className="mt-12 space-y-6">
    <Skeleton className="h-8 w-1/3" />
    {[...Array(3)].map((_, index) => (
      <div key={index} className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState<boolean>(true);
  const [subCategoryProducts, setSubCategoryProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      const productId = (await params).id;
      if (!productId) throw new Error("Product ID is required");

      setIsLoading(true);
      setError(null);

      const response = await getProductByIdAPI(productId);
      if (response?.data?.data) {
        setProduct(response.data.data);
        await fetchAllProductsBySubCategory(
          response.data.data.subcategory_id._id
        );
      } else {
        throw new Error("Product data not found");
      }
    } catch (err: any) {
      setError("Failed to load product details. Please try again later.");
      toast.error("Failed to load product details. Please try again later.");
      console.error("Failed to fetch product:", err);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  // Fetch all reviews for the product
  const fetchReviews = useCallback(async () => {
    if (!product?._id) return;

    try {
      setIsReviewsLoading(true);
      const response = await getAllReviewsByProduct(product._id);
      setReviews(response.data.data);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews. Please try again later.");
    } finally {
      setIsReviewsLoading(false);
    }
  }, [product]);

  // Add a review
  const addReview = useCallback(
    async (review: Review) => {
      try {
        await addReviewAPI({
          productId: product?._id,
          rating: review.rating,
          comment: review.comment,
        });
        toast.success("Review submitted successfully!");
        await fetchReviews(); // Refresh reviews after submission
      } catch (error: any) {
        console.error("Error adding review:", error);
        toast.error("Failed to submit review. Please try again later.");
      }
    },
    [product, fetchReviews]
  );

  // Add to wishlist
  const addToWishList = useCallback(async () => {
    if (!product?._id) return;

    try {
      const response = await addToWishListAPI(product._id);
      toast.success(response.data.message || "Item added to wishlist!");
      setProduct((prevProduct: any) =>
        prevProduct ? { ...prevProduct, inWishlist: true } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
      console.error("Error adding to wishlist:", error);
    }
  }, [product]);

  // Remove from wishlist
  const deleteProductFromWishlist = useCallback(async () => {
    if (!product?._id) return;

    try {
      const response = await deleteProductFromWishlistAPI(product._id);
      toast.success(response.data.message || "Item removed from wishlist!");
      setProduct((prevProduct: any) =>
        prevProduct ? { ...prevProduct, inWishlist: false } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from wishlist. Try again later."
      );
      console.error("Error removing from wishlist:", error);
    }
  }, [product]);

  // Add to cart
  const addToCart = useCallback(async () => {
    if (!product?._id) return;

    try {
      const response = await addToCartAPI({
        productId: product._id,
        quantity: 1,
      });
      toast.success(response.data.message || "Item added to cart!");
      setProduct((prevProduct: any) =>
        prevProduct ? { ...prevProduct, inCart: true } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
      console.error("Error adding to cart:", error);
    }
  }, [product]);

  // Buy now
  const buyNow = useCallback(async () => {
    if (!product?._id) return;

    try {
      await addToCartAPI({
        productId: product._id,
        quantity: 1,
      });
      window.location.href = "/checkout";
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to proceed to checkout. Try again later."
      );
      console.error("Error during Buy Now:", error);
    }
  }, [product]);

  // Fetch products by subcategory
  const fetchAllProductsBySubCategory = useCallback(
    async (subcategoryId: string) => {
      try {
        const response: any = await getProductBySubCategoryAPI(subcategoryId);
        setSubCategoryProducts(response.data.data);
      } catch (error: any) {
        console.error("Error fetching subcategory products:", error);
      }
    },
    []
  );

  // Fetch product and reviews on component mount
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
    }
  }, [product, fetchReviews]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {/* Product Image Carousel Skeleton */}
          <Skeleton className="w-full h-[500px] rounded-lg" />
          {/* Product Details Skeleton */}
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-10 w-3/4" /> {/* Title */}
            <Skeleton className="h-6 w-1/2" /> {/* Price */}
            <Skeleton className="h-4 w-full" /> {/* Description */}
            <Skeleton className="h-4 w-full" /> {/* Description */}
            <div className="flex gap-4">
              <Skeleton className="h-12 w-1/3" /> {/* Add to Cart */}
              <Skeleton className="h-12 w-1/3" /> {/* Buy Now */}
            </div>
            <Skeleton className="h-16 w-full" /> {/* Supplier Details */}
          </div>
        </div>
        {/* Product Description Skeleton */}
        <div className="mt-12 space-y-4">
          <Skeleton className="h-8 w-1/4" /> {/* Heading */}
          <Skeleton className="h-4 w-full" /> {/* Text */}
          <Skeleton className="h-4 w-3/4" /> {/* Text */}
          <Skeleton className="h-4 w-1/2" /> {/* Text */}
        </div>
        {/* Reviews Section Skeleton */}
        <SkeletonReviewsSection />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageCarousel product={product} />
        <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8 justify-center">
          <ProductDetails
            product={product}
            addToCart={addToCart}
            buyNow={buyNow}
            addToWishList={addToWishList}
            deleteProductFromWishlist={deleteProductFromWishlist}
            subCategoryProducts={subCategoryProducts}
          />
          <SupplierDetails product={product} />
        </div>
      </div>

      <ProductDescriptionAndDetails product={product} />

      <ReviewsSection
        reviews={reviews}
        addReview={addReview}
        isReviewsLoading={isReviewsLoading}
      />
    </div>
  );
};

export default ProductDetailPage;