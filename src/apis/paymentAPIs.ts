
import axiosInstance from ".";

export const verifyPaymentAPI = ({
  orderId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  addressSnapshot,
  paymentMethod,
  courierName,
}: {
  orderId: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  addressSnapshot: any;
  paymentMethod: 0 | 1; // 0 for Razorpay, 1 for COD
  courierName: string;
}) => {
  return axiosInstance.post(`/payment/verify`, {
    orderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    addressSnapshot,
    paymentMethod,
    courierName,
  });
};
