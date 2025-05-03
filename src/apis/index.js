import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'https://gauraaj.boostengine.in/api/v1', // API base URL
    timeout: 10000, // Request timeout (in milliseconds)
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add Authorization token if available
        if (typeof window !== 'undefined') { // Ensure this runs only on the client side
            const token = localStorage.getItem('accessToken'); // Adjust this according to your token storage method
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle errors (e.g., 401, 403, etc.)
        if (error.response) {
            if (error.response.status === 401) {
                if (typeof window !== 'undefined') { // Ensure this runs only on the client side
                    // Clear all local storage items
                    localStorage.clear(); // Clear all local storage items

                    // Redirect to login page
                    window.location.href = '/login'; // Use window.location for redirection
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;