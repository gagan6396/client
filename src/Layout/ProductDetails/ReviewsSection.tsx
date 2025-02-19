import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types";
import { useFormik } from "formik";
import { Star } from "lucide-react"; // Import a star icon from Lucide React
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
  const [hoverRating, setHoverRating] = useState<number>(0); // For hover effect on stars

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
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await addReview(values); // Pass the review to the parent component
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
    <div className="mt-8 sm:mt-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isReviewsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="border-b pb-4">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="border-b pb-3 sm:pb-4 mb-3 sm:mb-4 last:border-b-0"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {review.userId?.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {review.userId?.email || "Anonymous"}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm sm:text-base text-gray-500">No reviews yet.</p>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 mt-6 sm:mt-8"
          >
            <Input
              type="text"
              placeholder="Your Name"
              name="user"
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="text-sm sm:text-base"
            />
            {formik.touched.user && formik.errors.user ? (
              <div className="text-red-500 text-xs sm:text-sm">
                {formik.errors.user}
              </div>
            ) : null}

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      ratingValue <= (hoverRating || formik.values.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(ratingValue)}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                );
              })}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <div className="text-red-500 text-xs sm:text-sm">
                {formik.errors.rating}
              </div>
            ) : null}

            <Textarea
              placeholder="Your Review"
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className="text-sm sm:text-base"
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div className="text-red-500 text-xs sm:text-sm">
                {formik.errors.comment}
              </div>
            ) : null}

            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm sm:text-base transition-transform transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsSection;