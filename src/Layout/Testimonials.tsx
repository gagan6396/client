"use client";
import { getAllReviews } from "@/apis/reviewAPIs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick"; // Import react-slick
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import "slick-carousel/slick/slick.css"; // Import slick styles

// Example background image (replace with your own)
import backgroundImage from "@/public/l4.jpg"; // Add this image to your public folder

// Skeleton Testimonial Card
const SkeletonTestimonialCard = () => (
  <div className="bg-white bg-opacity-90 rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100">
    <div className="p-6 md:p-8 space-y-4">
      {/* Rating */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 w-6 bg-gray-300 rounded-full" />
        ))}
      </div>
      {/* Comment */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-300 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24" />
          <div className="h-3 bg-gray-300 rounded w-16" />
        </div>
      </div>
    </div>
  </div>
);

// Testimonial Card Component (Extracted for reusability)
const TestimonialCard = ({ review, handleReviewClick }: any) => (
  <div
    className="group relative bg-white bg-opacity-90 rounded-2xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
    onClick={() => handleReviewClick(review.productId._id)}
  >
    {/* Decorative Element */}
    <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-100 rounded-full -translate-x-12 -translate-y-12 opacity-50 group-hover:opacity-70 transition-opacity" />

    {/* Content */}
    <div className="p-6 md:p-8 relative z-10">
      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl md:text-2xl ${
              i < review?.rating ? "text-yellow-500" : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-base md:text-lg leading-relaxed line-clamp-2 italic mb-6">
        {`"${review?.comment}"`}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 border-yellow-200 shadow-sm">
          <AvatarImage
            src={review?.userId?.profileImage || "/default-avatar.png"}
            alt={`${review?.userId?.first_name} ${review?.userId?.last_name}`}
          />
          <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
            {review?.userId?.first_name[0] || "R"}
            {review?.userId?.last_name[0] || "G"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-gray-800 text-lg md:text-xl">
            {review?.userId?.first_name || "Rishabh"}{" "}
            {review?.userId?.last_name || "Gehlot"}
          </h4>
          <p className="text-sm text-gray-500">Verified Buyer</p>
        </div>
      </div>
    </div>

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none" />
  </div>
);

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getAllReviews();
      setReviews(response.data.data);

      const totalReviews = response.data.data.length;
      const totalRating = response.data.data.reduce(
        (sum: number, review: any) => sum + review.rating,
        0
      );
      const averageRating = totalRating / totalReviews;

      setStats({
        totalReviews,
        averageRating: parseFloat(averageRating.toFixed(1)),
      });
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  // Slider settings for all screens
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  };

  return (
    <section
      className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Stats */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Voices of Our Happy Customers
          </h2>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mx-auto" />
            </div>
          ) : (
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-sm">
              {stats.totalReviews} reviews with an average rating of{" "}
              <span className="font-semibold text-yellow-400">
                {stats.averageRating} ★
              </span>
            </p>
          )}
        </div>

        {/* Slider for Testimonials */}
        {loading ? (
          <Slider {...sliderSettings}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="px-2">
                <SkeletonTestimonialCard />
              </div>
            ))}
          </Slider>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-200 text-lg md:text-xl">
            No reviews available yet. Be the first to share your experience!
          </p>
        ) : (
          <Slider {...sliderSettings}>
            {reviews.slice(0, 3).map((review: any) => (
              <div key={review._id} className="px-2">
                <TestimonialCard
                  review={review}
                  handleReviewClick={handleReviewClick}
                />
              </div>
            ))}
          </Slider>
        )}

        {/* Optional CTA */}
        <div className="mt-12 text-center">
          <Button
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
            onClick={() => router.push("/products")}
          >
            Explore Our Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
