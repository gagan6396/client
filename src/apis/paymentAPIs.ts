import axiosInstance from ".";

export const verifyPaymentAPI = ({
  orderId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  addressSnapshot,
}: {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  addressSnapshot: any;
}) => {
  return axiosInstance.post(`/payment/verify`, {
    orderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    addressSnapshot,
  });
};
