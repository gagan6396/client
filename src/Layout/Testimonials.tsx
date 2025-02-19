"use client";
import { getAllReviews } from "@/apis/reviewAPIs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import shadcn Avatar
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// Testimonials Component
const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 });
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplay.current]
  );
  const router = useRouter();

  const fetchReviews = async () => {
    try {
      const response = await getAllReviews();
      setReviews(response.data.data);

      // Calculate stats
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
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900">
          What Our Customers Say
        </h2>

        {/* Carousel for Testimonials */}
        <div ref={emblaRef} className="embla overflow-hidden">
          <div className="embla__container flex space-x-6 py-4">
            {reviews.map((review: any, index) => (
              <div
                key={review._id}
                className="embla__slide min-w-[calc(100%/1.1)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] p-4"
                onClick={() => handleReviewClick(review.productId)} // Redirect to product page
              >
                <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <p className="text-gray-700 italic text-lg leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>
                  <div className="mt-6 flex flex-col items-center">
                    <Avatar className="w-16 h-16 border-2 border-gray-200">
                      <AvatarImage
                        src={
                          review.userId.profileImage || "/default-avatar.png"
                        } // Use profile image if available
                        alt={`${review.userId.first_name} ${review.userId.last_name}`}
                      />
                      <AvatarFallback>
                        {review.userId.first_name[0]}
                        {review.userId.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="mt-3 font-semibold text-gray-800 text-xl">
                      {review.userId.first_name} {review.userId.last_name}
                    </h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-2xl ${
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
