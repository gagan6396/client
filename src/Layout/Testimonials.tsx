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
  <div className="bg-white/95 rounded-2xl shadow-lg h-[380px] animate-pulse border border-green-100/30 p-6">
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gray-200/70 rounded-full md:w-24 md:h-24" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200/70 rounded w-full" />
        <div className="h-4 bg-gray-200/70 rounded w-5/6" />
        <div className="h-4 bg-gray-200/70 rounded w-3/4" />
      </div>
      <div className="text-center space-y-2">
        <div className="h-5 bg-gray-200/70 rounded w-32 mx-auto" />
        <div className="h-3 bg-gray-200/70 rounded w-24 mx-auto" />
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

  return (
    <div className="group relative bg-white/95 rounded-2xl shadow-lg h-[380px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-green-100/30 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <div className="p-6 flex flex-col h-full items-center text-center">
        <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-green-50 shadow-md transition-all group-hover:scale-105 mb-4 md:mb-6">
          <AvatarImage
            src={review.profile || "/default-avatar.png"}
            alt={"Reviewer"}
          />
          <AvatarFallback className="bg-green-50 text-green-600 font-semibold text-xl md:text-2xl">
            {name ? name.slice(0, 2).toUpperCase() : "AN"}
          </AvatarFallback>
        </Avatar>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed line-clamp-4 font-normal mb-4 md:mb-6">
          {text}
        </p>
        <div className="mt-auto">
          <h4 className="font-semibold text-gray-900 text-lg md:text-xl tracking-tight">
            {name || "Anonymous"}
          </h4>
          {title && (
            <p className="text-sm md:text-base text-green-600 font-medium">
              {title}
            </p>
          )}
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
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    className: "max-h-[430px]",
    customPaging: () => (
      <div className="w-2 h-2 bg-green-400/50 rounded-full transition-all hover:bg-green-500 hover:scale-125 border border-green-200/50" />
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-green-50/50 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12 relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight animate-fade-in-down">
            <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text font-extrabold text-transparent">
              Voices That Matter
            </span>
          </h2>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-green-200/20 rounded-full blur-xl animate-pulse" />
          {loading ? (
            <div className="animate-pulse h-5 w-48 bg-gray-300/40 rounded-full mx-auto" />
          ) : (
            <p className="text-lg md:text-xl text-gray-700 font-medium animate-fade-in-up">
              <span className="text-green-600">{stats.totalReviews}</span> Happy
              Customers
            </p>
          )}
        </div>

        {loading ? (
          <Slider {...sliderSettings}>
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="px-2 sm:px-3">
                  <SkeletonTestimonialCard />
                </div>
              ))}
          </Slider>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-700 text-lg md:text-xl font-medium animate-fade-in">
            Share your story with us!
          </p>
        ) : (
          <Slider {...sliderSettings}>
            {reviews.map((review) => (
              <div key={review._id} className="px-2 sm:px-3">
                <TestimonialCard review={review} />
              </div>
            ))}
          </Slider>
        )}

        <div className="mt-10 md:mt-12 text-center">
          <Button
            className="relative bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => router.push("/products")}
          >
            <span className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Explore Now</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
