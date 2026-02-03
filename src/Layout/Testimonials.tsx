"use client";

import { getAllpublicReviewAPI } from "@/apis/publicReviewAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
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
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg h-[320px] animate-pulse border border-amber-100 p-6">
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded w-full" />
        <div className="h-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded w-5/6" />
        <div className="h-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded w-3/4" />
      </div>
      <div className="text-center space-y-2">
        <div className="h-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded w-32 mx-auto" />
        <div className="h-2 bg-gradient-to-r from-amber-50 to-amber-100 rounded w-24 mx-auto" />
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
  const MAX_LENGTH = 120;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? text
    : text.slice(0, MAX_LENGTH) + (text.length > MAX_LENGTH ? "..." : "");

  // Generate random rating between 4 and 5
  const rating = Math.random() * (5 - 4) + 4;

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-amber-100 overflow-hidden mx-2">
      <div className="p-8 flex flex-col h-full items-center text-center relative">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-full blur-xl" />
          <Avatar className="w-20 h-20 border-2 border-amber-100 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-amber-200 relative">
            <AvatarImage
              src={review.profile || "/default-avatar.png"}
              alt="Reviewer"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 font-semibold text-lg">
              {name ? name.slice(0, 2).toUpperCase() : "AN"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "fill-amber-500 text-amber-500"
                  : "fill-amber-100 text-amber-200"
              }`}
            />
          ))}
          <span className="text-sm font-medium text-amber-700 ml-2">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Quote Icon */}
        <div className="text-amber-200 mb-4">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <div className="flex-1 mb-6">
          <p className="text-gray-700 text-sm leading-relaxed font-light mb-4 relative">
            "{displayText}"
            {text.length > MAX_LENGTH && (
              <button
                onClick={handleToggle}
                className="text-amber-600 hover:text-amber-700 font-medium text-xs ml-2 transition-colors"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-amber-100/50 w-full">
          <h4 className="font-semibold text-gray-900 text-base mb-1">{name || "Anonymous"}</h4>
          <p className="text-sm text-amber-600 font-medium">{title ?? "Satisfied Customer"}</p>
        </div>
      </div>
    </div>
  );
};

// Custom Arrow Components
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !left-0 !top-1/2 !-translate-y-1/2 !-translate-x-4 z-10`}
      style={{ ...style }}
      onClick={onClick}
    >
      <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300">
        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !right-0 !top-1/2 !-translate-y-1/2 !translate-x-4 z-10`}
      style={{ ...style }}
      onClick={onClick}
    >
      <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300">
        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
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
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-amber-200 rounded-full transition-all duration-300 hover:bg-amber-500" />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-12">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    responsive: [
      { 
        breakpoint: 1280, 
        settings: { 
          slidesToShow: 3,
          arrows: true
        } 
      },
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 2,
          arrows: false
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1,
          arrows: false
        } 
      },
    ],
  };

  return (
    <section className="relative bg-gradient-to-b from-amber-50/30 to-white py-16 md:py-10 overflow-hidden">
      {/* Background Pattern - Fixed SVG */}
      <div className="absolute inset-0 opacity-10 bg-green-800" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            {/* <div className="w-3 h-3 rounded-full bg-amber-400"></div> */}
            {/* <span className="text-sm font-medium text-amber-700 uppercase tracking-wider">
              Testimonials
            </span> */}
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            
            <span className="block font-serif italic text-[#2d5437] mt-2">
              Testimonials
            </span>
          </h2>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 mx-auto mb-6"></div>
{/*           
          {loading ? (
            <div className="animate-pulse h-5 w-48 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full mx-auto" />
          ) : (
            <div className="space-y-2">
              <p className="text-gray-600 font-light text-lg">
                Trusted by <span className="font-bold text-amber-700">{stats.totalReviews}+</span> Happy Customers
              </p>
              <p className="text-sm text-gray-500 font-light">
                Real stories from our valued community
              </p>
            </div>
          )} */}
        </div>

        {/* Testimonials Slider */}
        <div className="relative mb-12">
          {loading ? (
            <Slider {...sliderSettings}>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="px-2">
                    <SkeletonTestimonialCard />
                  </div>
                ))}
            </Slider>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-gray-700 mb-2">Be the First to Share</h3>
              <p className="text-gray-500 font-light mb-6">
                Your experience could inspire others
              </p>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => router.push("/review")}
              >
                Share Your Story
              </Button>
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {reviews.map((review) => (
                <div key={review._id} className="px-2">
                  <TestimonialCard review={review} />
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          {/* <p className="text-gray-600 font-light text-lg mb-8">
            Join our community of satisfied customers
          </p> */}
         <Button
  className="group bg-amber-50 text-[#7A6E18] hover:bg-amber-100 px-10 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden relative border border-amber-200"
  onClick={() => router.push("/products")}
>
  <span className="relative z-10 flex items-center gap-3">
    <span>Explore Our Products</span>
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;