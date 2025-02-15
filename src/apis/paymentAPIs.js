import axiosInstance from ".";

export const verifyPaymentAPI = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = axiosInstance.post(`/payment/verify`, {
        razorpay_order_id, razorpay_payment_id, razorpay_signature
    })
    return response;
}