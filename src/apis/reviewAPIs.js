import axiosInstance from ".";

export const addReviewAPI = ({ productId, rating, comment }) => {
    const response = axiosInstance.post(`/reviews`, {
        productId, rating, comment
    })
    return response;
}
export const getAllReviewsByProduct = (productId) => {
    const response = axiosInstance.get(`/reviews/products/${productId}`)
    return response;
}
export const getAllReviews = () => {
    const response = axiosInstance.get(`/reviews`)
    return response;
}
