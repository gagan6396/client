// services/blog.service.ts
import axiosInstance from ".";

interface BlogBody {
  title: string;
  content: string;
  category: string;
  sequence?: number;
  isPinned?: boolean;
  isHidden?: boolean;
  tags?: string[];
  imageUrl?: string;
}

interface UpdateBlogBody extends Partial<BlogBody> {}

// Create a new blog
export const createBlogAPI = async ({ formData }: { formData: FormData }) => {
  const response = await axiosInstance.post(`/blogs`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

// Get all blogs
export const getAllBlogsAPI = async () => {
  const response = await axiosInstance.get(`/blogs`);
  return response;
};

// Get a single blog by ID
export const getBlogByIdAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response;
};

// Update a blog
export const updateBlogAPI = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axiosInstance.patch(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

// Delete a blog
export const deleteBlogAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`/blogs/${id}`);
  return response;
};

// Toggle pin status
export const togglePinBlogAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.patch(`/blogs/${id}/toggle-pin`);
  return response;
};

// Toggle hide status
export const toggleHideBlogAPI = async ({ id }: { id: string }) => {
  const response = await axiosInstance.patch(`/blogs/${id}/toggle-hide`);
  return response;
};
