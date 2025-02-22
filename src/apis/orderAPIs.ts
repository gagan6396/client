import axiosInstance from ".";
// Define types for better TypeScript support
interface OrderResponse {
  status: number;
  success: boolean;
  message: string;
  data?: any;
}

interface ReturnExchangePayload {
  reason: string;
  products: { productId: string; quantity: number }[];
}

export const createOrderAPI = (data: {
  products: {
    productId: string;
    quantity: number;
    discount?: number;
    tax?: number;
  }[];
  shippingAddress: {
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: "Razorpay" | "COD";
  userDetails: { name: string; phone: string; email: string };
}) => {
  return axiosInstance.post("/orders", data);
};
// paymentAPIs.ts
export const verifyPaymentAPI = (data: {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  addressSnapshot?: any;
}) => {
  return axiosInstance.post("/payment/verify", data);
};

// Fetch a specific order by ID
export const getOrderByIdAPI = async (
  orderId: string
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// Fetch all orders for the authenticated user
export const getUserOrdersAPI = async (): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get(`/users/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// Fetch order history for the authenticated user
export const getUserOrderHistoryAPI = async (): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get(`/users/orders/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

// Cancel an order
export const cancelOrderAPI = async (
  orderId: string
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post(`/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
};

// Request a return for an order
export const returnOrderAPI = async (
  orderId: string,
  reason: string,
  products: { productId: string; quantity: number }[]
): Promise<OrderResponse> => {
  try {
    const payload: ReturnExchangePayload = { reason, products };
    const response = await axiosInstance.post(
      `/orders/${orderId}/return`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Error returning order ${orderId}:`, error);
    throw error;
  }
};

// Request an exchange for an order
export const exchangeOrderAPI = async (
  orderId: string,
  reason: string,
  products: { productId: string; quantity: number }[]
): Promise<OrderResponse> => {
  try {
    const payload: ReturnExchangePayload = { reason, products };
    const response = await axiosInstance.post(
      `/orders/${orderId}/exchange`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Error exchanging order ${orderId}:`, error);
    throw error;
  }
};

// Track an order
export const trackOrderAPI = async (
  orderId: string
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get(`/orders/track/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error tracking order ${orderId}:`, error);
    throw error;
  }
};
