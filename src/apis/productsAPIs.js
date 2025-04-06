import axiosInstance from ".";

export const getProductsAPI = () => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("accessToken"); // Use getItem to check for the token
        if (token) {
            // If token exists, make an authenticated request
            return axiosInstance.get('/products/auth');
        }
    }
    // If no token, make an unauthenticated request
    return axiosInstance.get('/products');
};

export const getProductByIdAPI = (id) => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("accessToken"); // Use getItem to check for the token
        if (token) {
            // If token exists, make an authenticated request
            return axiosInstance.get(`/products/auth/${id}`);
        }
    }
    // If no token, make an unauthenticated request
    return axiosInstance.get(`/products/${id}`);
};