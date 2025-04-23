import axiosInstance from ".";

export const verifyPaymentAPI = ({
  orderId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  addressSnapshot,
  paymentMethod,
}: {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  addressSnapshot: any;
  paymentMethod: 0 | 1; // Updated to number (0 for Razorpay, 1 for COD)  
}) => {
  return axiosInstance.post(`/payment/verify`, {
    orderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    addressSnapshot,
    paymentMethod,
  });
};
