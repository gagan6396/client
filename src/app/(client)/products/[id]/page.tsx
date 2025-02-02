"use client";

import { getProductByIdAPI } from "@/apis/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: { $numberDecimal?: string };
  features?: string[];
  images?: string[];
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

const ProductDetailPage = () => {
  const pathname = usePathname();
  const productId = pathname.split("/").pop();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    user: "",
    rating: 0,
    comment: "",
  });

  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  // useEffect(() => {
  //   if (emblaApi) autoplay.current?.play();
  // }, [emblaApi]);

  const fetchProduct = async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getProductByIdAPI(productId);
      if (response?.data?.data) {
        setProduct(response.data.data);
      } else {
        throw new Error("Product data not found");
      }
    } catch (err: any) {
      setError("Failed to load product details. Please try again later.");
      console.error("Failed to fetch product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setNewReview({ user: "", rating: 0, comment: "" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found.
      </div>
    );
  }

  if (!product.images || product.images.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No images available
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <div className="w-full">
          <div className="embla w-full overflow-hidden">
            <div className="embla__container flex">
              {product.images.length ? (
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className="embla__slide flex-shrink-0 w-full flex justify-center"
                  >
                    <Image
                      src={image}
                      width={400}
                      height={400}
                      alt={`Product Image ${index + 1}`}
                      className="rounded-lg object-cover h-96 w-auto"
                    />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4 justify-center">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-semibold text-green-600">
              ₹{product.price?.$numberDecimal || "N/A"}
            </p>
          </div>
          <p className="text-gray-700 text-sm">{product.description}</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="flex items-center space-x-4 mt-4">
            <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add to Cart <AiOutlineShoppingCart className="inline ml-2" />
            </button>
            <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Add to Wishlist{" "}
              <AiOutlineHeart className="inline ml-2 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="Description" className="w-full mt-5">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Description">Description</TabsTrigger>
          <TabsTrigger value="Benefits">Benefits</TabsTrigger>
          <TabsTrigger value="Reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="Description">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="Benefits">
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
              <CardDescription>
                {product.features?.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="Reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <p className="font-semibold text-gray-800">{review.user}</p>
                    <p className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </p>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}

              <form
                onSubmit={handleReviewSubmit}
                className="space-y-4 mt-4 border-t pt-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.user}
                  onChange={(e) =>
                    setNewReview({ ...newReview, user: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: +e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Rating</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Your Review"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  rows={4}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailPage;
