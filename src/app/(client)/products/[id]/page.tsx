"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Product Description and Details Component
const ProductDescriptionAndDetails = ({ product }: { product: Product }) => {
  return (
    <div className="mt-10 md:mt-16">
      <Tabs defaultValue="description" className="w-full">
        {/* Tabs Navigation */}
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1 shadow-sm">
          <TabsTrigger
            value="description"
            className="text-base md:text-lg font-medium text-gray-700 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md transition-all duration-200"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="text-base md:text-lg font-medium text-gray-700 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md transition-all duration-200"
          >
            Details
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="mt-6">
          <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div
                className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-6">
          <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <dl className="space-y-4 md:space-y-5 text-sm md:text-base text-gray-700">
                {/* Category */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Category</dt>
                  <dd className="text-gray-600">
                    {product.category_id && typeof product.category_id !== "string"
                      ? product.category_id.name
                      : "N/A"}
                  </dd>
                </div>

                {/* Subcategory */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Subcategory</dt>
                  <dd className="text-gray-600">
                    {product.subcategory_id && typeof product.subcategory_id !== "string"
                      ? product.subcategory_id.name
                      : "N/A"}
                  </dd>
                </div>

                {/* Brand */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Brand</dt>
                  <dd className="text-gray-600">{product.brand || "N/A"}</dd>
                </div>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="font-semibold text-gray-800 mb-2">Variants</dt>
                    <dd className="text-gray-600">
                      <ul className="space-y-2">
                        {product.variants.map((variant) => (
                          <li
                            key={variant._id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-2 rounded-md"
                          >
                            <span>
                              {variant.name} - ₹
                              {variant.price && typeof variant.price === "object"
                                ? variant.price.$numberDecimal
                                : variant.price}{" "}
                              ({variant.stock} in stock)
                              {variant.weight ? `, ${variant.weight} kg` : ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}

                {/* Created At */}
                <div className="flex items-center justify-between pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Created At</dt>
                  <dd className="text-gray-600">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
        const subcategoryId =
          typeof response.data.data.subcategory_id === "string"
            ? response.data.data.subcategory_id
            : response.data.data.subcategory_id?._id;
        if (subcategoryId) {
          await fetchAllProductsBySubCategory(subcategoryId);
        }
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
      setReviews(response.data.data || []);
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
        await fetchReviews();
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
      router.push("/checkout");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to proceed to checkout. Try again later."
      );
      console.error("Error during Buy Now:", error);
    }
  }, [product, router]);

  // Fetch products by subcategory
  const fetchAllProductsBySubCategory = useCallback(
    async (subcategoryId: string) => {
      try {
        const response: any = await getProductBySubCategoryAPI(subcategoryId);
        setSubCategoryProducts(response.data.data || []);
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
          <Skeleton className="w-full h-[500px] rounded-lg" />
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-12 w-1/3" />
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
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