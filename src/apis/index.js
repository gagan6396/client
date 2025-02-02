import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://server.boostengine.in/api/v1', // API base URL
    timeout: 10000, // Request timeout (in milliseconds)
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add Authorization token if available
        const token = localStorage.getItem('accessToken'); // Adjust this according to your token storage method
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
                // Optional: Redirect to login page
                console.error('Unauthorized. Redirecting to login...');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
