import axiosInstance from ".";

export const validateCartAPI = () => {
    const response = axiosInstance.post(`/checkout/validate-cart`)
    return response;
}
export const applyCouponAPI = (code) => {
    const response = axiosInstance.post(`/checkout/apply-coupon`, { code })
    return response;
}
export const reviewOrderAPI = () => {
    const response = axiosInstance.get(`/checkout/review-order`)
    return response;
}