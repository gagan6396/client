import axiosInstance from ".";

interface ReelData {
    name: string;
    description: string;
    reelUrl: string;
    products?: string[];
}

// Create a new reel
export const createReelAPI = (data: ReelData) => {
    return axiosInstance.post("/reels", data);
};

// Get all reels
export const getReelsAPI = () => {
    return axiosInstance.get("/reels");
};

// Get a single reel by ID
export const getReelByIdAPI = (id: string) => {
    return axiosInstance.get(`/reels/${id}`);
};

// Delete a reel
export const deleteReelAPI = (id: string) => {
    return axiosInstance.delete(`/reels/${id}`);
};

// Add a product to a reel
export const addProductToReelAPI = (reelId: string, productId: string) => {
    return axiosInstance.post(`/reels/${reelId}/add-product`, { productId });
};
