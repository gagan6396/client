"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types";
import { useFormik } from "formik";
import { Star } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

interface ReviewsSectionProps {
  reviews: any[];
  addReview: (review: Review) => void;
  isReviewsLoading: boolean;
}

const ReviewsSection = ({
  reviews,
  addReview,
  isReviewsLoading,
}: ReviewsSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      user: "",
      rating: 0,
      comment: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().required("Name is required"),
      rating: Yup.number()
        .min(1, "Please select a rating")
        .required("Rating is required"),
      comment: Yup.string().required("Review comment is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await addReview(values);
        formik.resetForm();
      } catch (error) {
        console.error("Error submitting review:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleStarClick = (rating: number) => {
    formik.setFieldValue("rating", rating);
  };

  return (
    <div className="mt-10 md:mt-16">
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            What Our Customers Say
          </CardTitle>
          <p className="text-base md:text-lg text-gray-500">
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Reviews List */}
          {isReviewsLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0 group hover:bg-gray-50 transition-colors duration-200 rounded-lg p-2"
                >
                  <Avatar className="w-12 h-12 border-2 border-gray-200 group-hover:border-green-300 transition-colors">
                    <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                      {review.userId?.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center md:justify-between flex-wrap">
                      <p className="font-semibold text-base md:text-lg text-gray-800">
                        {review.userId?.email || "Anonymous"}
                      </p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 md:h-5 md:w-5 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-base md:text-lg text-gray-500 italic">
                Be the first to share your thoughts!
              </p>
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Your Name"
                name="user"
                value={formik.values.user}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-lg border-gray-200 bg-gray-50 text-base md:text-lg focus:ring-green-500 focus:border-green-500"
              />
              {formik.touched.user && formik.errors.user && (
                <p className="text-red-500 text-xs md:text-sm">
                  {formik.errors.user}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <Star
                    key={i}
                    className={`h-7 w-7 md:h-8 md:w-8 cursor-pointer transition-all duration-200 ${
                      ratingValue <= (hoverRating || formik.values.rating)
                        ? "text-yellow-500 fill-yellow-500 scale-110"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(ratingValue)}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                );
              })}
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <p className="text-red-500 text-xs md:text-sm">
                {formik.errors.rating}
              </p>
            )}

            <div className="space-y-2">
              <Textarea
                placeholder="Share your experience..."
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className="rounded-lg border-gray-200 bg-gray-50 text-base md:text-lg focus:ring-green-500 focus:border-green-500"
              />
              {formik.touched.comment && formik.errors.comment && (
                <p className="text-red-500 text-xs md:text-sm">
                  {formik.errors.comment}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsSection;