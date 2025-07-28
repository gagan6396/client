import axiosInstance from ".";

interface SliderButton {
  label: string;
  actionURL: string;
}

interface SliderBody {
  title: string;
  subtitle: string;
  button: SliderButton;
  sequence?: number;
  isHidden?: boolean;
  imageUrl?: string;
}

interface UpdateSliderBody extends Partial<SliderBody> {}

// Create a new slider
export const createSliderAPI = async ({ formData }: { formData: FormData }) => {
  const response = await axiosInstance.post(`/sliders`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

// Get all sliders
export const getAllSlidersAPI = async () => {
  const response = await axiosInstance.get(`/sliders`);
  return response;
};

// Get a single slider by ID
export const getSliderByIdAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get(`/sliders/${id}`);
  return response;
};

// Update a slider
export const updateSliderAPI = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axiosInstance.patch(`/sliders/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

// Delete a slider
export const deleteSliderAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`/sliders/${id}`);
  return response;
};

// Toggle hide status
export const toggleHideSliderAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.patch(`/sliders/${id}/toggle-hide`);
  return response;
};