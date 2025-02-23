"use client";
import { getAllReviews } from "@/apis/reviewAPIs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Added for a potential CTA
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 });
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Stats */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Voices of Our Happy Customers
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {stats.totalReviews} reviews with an average rating of{" "}
            <span className="font-semibold text-yellow-500">
              {stats.averageRating} ★
            </span>
          </p>
        </div>

        {/* Responsive Grid for Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review: any, index) => (
            <div
              key={review?._id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
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
                <p className="text-gray-700 text-base md:text-lg leading-relaxed line-clamp-4 italic mb-6">
                  "{review?.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 border-yellow-200 shadow-sm">
                    <AvatarImage
                      src={
                        review?.userId?.profileImage || "/default-avatar.png"
                      }
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
          ))}
        </div>

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
