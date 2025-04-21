"use client";

import { getAllpublicReviewAPI } from "@/apis/publicReviewAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/public/l4.jpg";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Types
interface Review {
  _id: string;
  comment: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Stats {
  totalReviews: number;
}

// Skeleton Testimonial Card
const SkeletonTestimonialCard = () => (
  <div className="bg-white rounded-xl shadow-sm h-[280px] animate-pulse border border-green-100/30 p-4">
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>
      <div className="text-center space-y-1">
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
        <div className="h-2 bg-gray-200 rounded w-16 mx-auto" />
      </div>
    </div>
  </div>
);

// Parse comment
const parseComment = (comment: string) => {
  const match = comment.match(/^"(.+)"\s*–\s*(.+)$/);
  return match
    ? { text: match[1], reviewer: match[2] }
    : { text: comment, reviewer: "Anonymous" };
};

// Testimonial Card Component
const TestimonialCard = ({ review }: { review: Review }) => {
  const { text, reviewer } = parseComment(review.comment);
  const [name, title] = reviewer.split(", ");
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? text
    : text.slice(0, MAX_LENGTH) + (text.length > MAX_LENGTH ? "..." : "");

  return (
    <div className="group bg-white rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 border border-green-100/30 overflow-hidden mx-2">
      <div className="p-4 flex flex-col h-full items-center text-center">
        <Avatar className="w-16 h-16 border border-green-50 shadow-sm transition-all group-hover:scale-105 mb-3">
          <AvatarImage
            src={review.profile || "/default-avatar.png"}
            alt="Reviewer"
            className="object-cover"
          />
          <AvatarFallback className="bg-green-50 text-green-600 font-semibold text-sm">
            {name ? name.slice(0, 2).toUpperCase() : "AN"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-gray-700 text-sm leading-relaxed font-normal mb-3">
            {displayText}
            {text.length > MAX_LENGTH && (
              <button
                onClick={handleToggle}
                className="text-green-600 hover:text-green-700 font-medium text-xs ml-1 transition-colors"
              >
                {isExpanded ? "Less" : "More"}
              </button>
            )}
          </p>
        </div>
        <div className="mt-auto">
          <h4 className="font-semibold text-gray-900 text-sm">{name || "Anonymous"}</h4>
          <p className="text-xs text-green-600 font-medium">{title ?? "Customer"}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats>({ totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllpublicReviewAPI();
      const reviewData = response.data.data;
      setReviews(reviewData);
      setStats({ totalReviews: reviewData.length });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-2 h-2 bg-green-400/50 rounded-full transition-all hover:bg-green-500" />
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-8"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-green-50/30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text font-extrabold text-transparent">
              Voices That Matter
            </span>
          </h2>
          {loading ? (
            <div className="animate-pulse h-4 w-32 bg-gray-200 rounded-full mx-auto" />
          ) : (
            <p className="text-sm text-gray-700 font-medium">
              Happy Customers ({stats.totalReviews})
            </p>
          )}
        </div>

        {loading ? (
          <Slider {...sliderSettings}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <SkeletonTestimonialCard />
                </div>
              ))}
          </Slider>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-700 font-medium">
              Share your story with us!
            </p>
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {reviews.map((review) => (
              <div key={review._id}>
                <TestimonialCard review={review} />
              </div>
            ))}
          </Slider>
        )}

        <div className="mt-6 text-center">
          <Button
            className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-all"
            onClick={() => router.push("/products")}
          >
            Explore Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;