"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product3Image from "@/public/product-3.png";
import Product4Image from "@/public/product-4.png";
import Product5Image from "@/public/product-5.png";
import Product6Image from "@/public/product-6.png";
import Product7Image from "@/public/product-7.png";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const ProductDetailPage = ({ product }: any) => {
  const { imageSrc, title, price, originalPrice, description, features } =
    product;

  const carouselImages = [
    Product3Image,
    Product4Image,
    Product5Image,
    Product6Image,
    Product7Image,
  ];

  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  useEffect(() => {
    if (emblaApi) autoplay.current?.play();
  }, [emblaApi]);

  const [reviews, setReviews] = useState([
    {
      user: "John Doe",
      rating: 5,
      comment: "Amazing product! Exceeded my expectations.",
    },
    {
      user: "Jane Smith",
      rating: 4,
      comment: "Great quality and taste. Will buy again!",
    },
  ]);

  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });

  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: "", rating: 0, comment: "" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <div className="w-full">
          <div ref={emblaRef} className="embla w-full overflow-hidden">
            <div className="embla__container flex">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className="embla__slide flex-shrink-0 w-full flex justify-center"
                >
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    alt={`Carousel Image ${index + 1}`}
                    className="rounded-lg object-cover h-96 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4 justify-center">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

          <div className="flex items-center space-x-4">
            <p className="text-2xl font-semibold text-green-600">{price}</p>
            <del className="text-gray-500 text-lg">{originalPrice}</del>
          </div>

          <p className="text-gray-700 text-sm">{description}</p>

          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {features?.map((feature: any, index: any) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="flex items-center space-x-4 mt-4">
            <button className="px-5 md:px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add to Cart <AiOutlineShoppingCart className="inline ml-2" />
            </button>

            <button className="px-5 md:px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Add to Wishlist{" "}
              <AiOutlineHeart className="inline ml-2 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="Description" className=" w-full mt-5">
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
                {product.features.map((item: any, index: any) => (
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
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-semibold text-gray-800">{review.user}</p>
                  <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}

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
                />
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: +e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
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

// Example product data
const exampleProduct = {
  imageSrc: "/product-1.png",
  title: "Mixed Sweets",
  price: "₹118.75",
  originalPrice: "₹125.00",
  description:
    "A delightful mix of traditional sweets made with premium ingredients to satisfy your cravings.",
  features: [
    "Handmade with care",
    "Organic ingredients",
    "Perfect for gifting",
    "No artificial flavors",
  ],
};

export default function ProductDetail() {
  return <ProductDetailPage product={exampleProduct} />;
}
