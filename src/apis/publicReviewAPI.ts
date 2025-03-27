import axiosInstance from ".";

interface ReviewBody {
  comment: string;
  images: File[];
}

interface UpdateReviewBody extends Partial<ReviewBody> {}

// Create a new review
export const createReviewAPI = async ({ formData }: { formData: FormData }) => {
  const response = await axiosInstance.post(`/publicReview`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

// Get all publicReview
export const getAllpublicReviewAPI = async () => {
  const response = await axiosInstance.get(`/publicReview`);
  return response;
};

// Get a single review by ID
export const getReviewByIdAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get(`/publicReview/${id}`);
  return response;
};

// Update a review
export const updateReviewAPI = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axiosInstance.put(`/publicReview/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

// Delete a review
export const deleteReviewAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`/publicReview/${id}`);
  return response;
};
