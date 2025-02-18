"use client";

import { addToCartAPI, deleteToCartAPI } from "@/apis/addToCartAPIs";
import { getProductByIdAPI } from "@/apis/productsAPIs";
import {
  addToWishListAPI,
  deleteProductFromWishlistAPI,
} from "@/apis/wishlistAPIs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn Skeleton for loading state
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/public/logo.png";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // React Toastify CSS
import * as Yup from "yup";

interface Supplier {
  _id: string;
  username: string;
  email: string;
  shop_name: string;
  shop_address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
}

interface Subcategory {
  _id: string;
  name: string;
  description: string;
  slug: string;
}

interface Product {
  _id: string;
  supplier_id: Supplier;
  category_id: Category;
  subcategory_id: Subcategory;
  reviews: Review[];
  name: string;
  description: string;
  price: { $numberDecimal: string };
  stock: number;
  images: string[];
  rating: number;
  brand: string;
  sku: string;
  skuParameters: Record<string, any>;
  createdAt: string;
  inWishlist: boolean;
  inCart: boolean;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(
    product?.images[0] || ""
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Formik and Yup setup for review form
  const formik = useFormik({
    initialValues: {
      user: "",
      rating: 0,
      comment: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().required("Name is required"),
      rating: Yup.number()
        .min(1, "Rating is required")
        .required("Rating is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      setReviews((prevReviews) => [...prevReviews, values]);
      toast.success("Review submitted successfully!");
      formik.resetForm();
    },
  });

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const productId = (await params).id;
      if (!productId) throw new Error("Product ID is required");

      setIsLoading(true);
      setError(null);

      const response = await getProductByIdAPI(productId);
      if (response?.data?.data) {
        setProduct(response.data.data);
        setSelectedImage(response.data.data.images[0]);
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
  };

  // Add to Wishlist
  const addToWishList = async () => {
    if (!product?._id) return;

    try {
      const response = await addToWishListAPI(product._id);
      toast.success(response.data.message || "Item added to wishlist!");
      setProduct((prevProduct) =>
        prevProduct ? { ...prevProduct, inWishlist: true } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to wishlist. Try again later."
      );
      console.error("Error adding to wishlist:", error);
    }
  };

  // Remove from Wishlist
  const deleteProductFromWishlist = async () => {
    if (!product?._id) return;

    try {
      const response = await deleteProductFromWishlistAPI(product._id);
      toast.success(response.data.message || "Item removed from wishlist!");
      setProduct((prevProduct) =>
        prevProduct ? { ...prevProduct, inWishlist: false } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from wishlist. Try again later."
      );
      console.error("Error removing from wishlist:", error);
    }
  };

  // Add to Cart
  const addToCart = async () => {
    if (!product?._id) return;

    try {
      const response = await addToCartAPI({
        productId: product._id,
        quantity: 1,
      });
      toast.success(response.data.message || "Item added to cart!");
      setProduct((prevProduct) =>
        prevProduct ? { ...prevProduct, inCart: true } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart. Try again later."
      );
      console.error("Error adding to cart:", error);
    }
  };

  // Remove from Cart
  const deleteToCart = async () => {
    if (!product?._id) return;

    try {
      const response = await deleteToCartAPI(product._id);
      toast.success(response.data.message || "Item removed from cart!");
      setProduct((prevProduct) =>
        prevProduct ? { ...prevProduct, inCart: false } : null
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from cart. Try again later."
      );
      console.error("Error removing from cart:", error);
    }
  };

  // Buy Now
  const buyNow = async () => {
    if (!product?._id) return;

    try {
      // Add to cart first
      await addToCartAPI({
        productId: product._id,
        quantity: 1,
      });
      // Redirect to checkout page
      window.location.href = "/checkout"; // Update the URL as needed
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to proceed to checkout. Try again later."
      );
      console.error("Error during Buy Now:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params]);

  // Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Skeleton */}
          <Skeleton className="w-full h-[500px] rounded-lg" />
          {/* Details Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Product Image Carousel */}
        <div className="w-full">
          {product.images.length ? (
            <>
              {/* Main Image */}
              <div className="relative flex justify-center mb-4">
                <img
                  src={selectedImage}
                  width={500}
                  height={500}
                  alt="Main Product Image"
                  className={`rounded-lg object-cover h-[300px] md:h-[500px] w-auto cursor-zoom-in ${
                    isZoomed ? "scale-150 transform origin-center" : ""
                  }`}
                  onClick={toggleZoom}
                />
                {isZoomed && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <button
                      className="text-white text-sm md:text-lg bg-black bg-opacity-75 px-3 py-1 md:px-4 md:py-2 rounded-full"
                      onClick={toggleZoom}
                    >
                      Zoom Out
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                      selectedImage === image
                        ? "border-green-600"
                        : "border-transparent"
                    }`}
                    onClick={() => handleThumbnailClick(image)}
                  >
                    <img
                      src={image}
                      width={100}
                      height={100}
                      alt={`Product Thumbnail ${index + 1}`}
                      className="h-16 md:h-24 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[300px] md:h-[500px] bg-gray-100 rounded-lg">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4 md:space-y-6 justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          <div className="flex items-center space-x-2 md:space-x-4">
            <p className="text-xl md:text-3xl font-semibold text-green-600">
              ₹{product.price?.$numberDecimal || "N/A"}
            </p>
            {product.stock > 0 ? (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 text-xs md:text-sm"
              >
                In Stock
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-red-100 text-red-800 text-xs md:text-sm"
              >
                Out of Stock
              </Badge>
            )}
          </div>
          <p className="text-sm md:text-base text-gray-700">
            {product.description}
          </p>

          {/* Add to Cart, Buy Now, and Wishlist Buttons */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Button
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 bg-green-600 hover:bg-green-700 text-white text-sm md:text-base"
              onClick={addToCart}
              disabled={product.inCart}
            >
              <AiOutlineShoppingCart className="mr-2" />
              {product.inCart ? "Added to Cart" : "Add to Cart"}
            </Button>
            <Button
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
              onClick={buyNow}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
              onClick={
                product.inWishlist ? deleteProductFromWishlist : addToWishList
              }
            >
              {product.inWishlist ? (
                <FaHeart className="text-red-600" />
              ) : (
                <CiHeart className="text-gray-400 hover:text-red-600" />
              )}
              {product.inWishlist ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Supplier Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Sold by</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-2 md:space-x-4">
              <Avatar>
                <AvatarImage
                  src={
                    logo
                      ? typeof logo === "string"
                        ? logo
                        : logo.src
                      : "https://placehold.co/50"
                  }
                  alt="Supplier Avatar"
                  className="object-contain"
                />
                <AvatarFallback>
                  {product.supplier_id.username[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  {product.supplier_id.shop_name}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {product.supplier_id.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Description and Details */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p>
                    <strong>Category:</strong> {product.category_id.name}
                  </p>
                  <p>
                    <strong>Subcategory:</strong> {product.subcategory_id.name}
                  </p>
                  <p>
                    <strong>Brand:</strong> {product.brand}
                  </p>
                  <p>
                    <strong>SKU:</strong> {product.sku}
                  </p>
                  <p>
                    <strong>Stock:</strong> {product.stock}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <p className="text-yellow-500">
                        {"★".repeat(review.rating)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            {/* Add Review Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-4 mt-8">
              <Input
                type="text"
                placeholder="Your Name"
                name="user"
                value={formik.values.user}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.user && formik.errors.user ? (
                <div className="text-red-500 text-sm">{formik.errors.user}</div>
              ) : null}

              <Select
                value={formik.values.rating.toString()}
                onValueChange={(value) =>
                  formik.setFieldValue("rating", +value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <SelectItem key={star} value={star.toString()}>
                      {star} Star{star > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.rating && formik.errors.rating ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.rating}
                </div>
              ) : null}

              <Textarea
                placeholder="Your Review"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
              />
              {formik.touched.comment && formik.errors.comment ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.comment}
                </div>
              ) : null}

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
