
// services/order.api.ts
import axiosInstance from ".";

interface OrderResponse {
  status: number;
  success: boolean;
  message: string;
  data?: any;
}

interface ReturnExchangePayload {
  reason: string;
  products: { productId: string; variantId: string; quantity: number }[];
}

// Create a new order
export const createOrderAPI = (data: {
  products: {
    productId: string;
    variantId: string;
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
  paymentMethod: 0 | 1;
  userDetails: { name: string; phone: string; email: string };
  courierName: string;
}) => {
  return axiosInstance.post("/orders", data);
};

// Calculate shipping charges
export const calculateShippingChargesAPI = async (
  postalCode: string,
  products: { productId: string; variantId: string; quantity: number }[],
  isCOD: 0 | 1
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post("/orders/calculate-shipping", {
      postalCode,
      products,
      isCOD,
    });
    console.log("Shipping options:", response.data.data.shippingOptions);
    return response.data;
  } catch (error) {
    console.error("Error calculating shipping charges:", error);
    throw error;
  }
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
  orderId: string,
  reason?: string
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post(`/orders/${orderId}/cancel`, { reason });
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
  products: { productId: string; variantId: string; quantity: number }[]
): Promise<OrderResponse> => {
  try {
    const payload: ReturnExchangePayload = { reason, products };
    const response = await axiosInstance.post(`/orders/${orderId}/return`, payload);
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
  products: { productId: string; variantId: string; quantity: number }[]
): Promise<OrderResponse> => {
  try {
    const payload: ReturnExchangePayload = { reason, products };
    const response = await axiosInstance.post(`/orders/${orderId}/exchange`, payload);
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

// Ship an order
export const shipOrderAPI = async (orderId: string): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post(`/orders/${orderId}/ship`);
    return response.data;
  } catch (error) {
    console.error(`Error shipping order ${orderId}:`, error);
    throw error;
  }
};

// Perform post-order actions
export const postOrderActionsAPI = async (
  orderId: string
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post(`/orders/${orderId}/post-actions`);
    return response.data;
  } catch (error) {
    console.error(`Error performing post-order actions for ${orderId}:`, error);
    throw error;
  }
};

// Fetch shipping analytics
export const getShippingAnalyticsAPI = async (
  startDate: string,
  endDate: string
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get(`/orders/analytics/shipping`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping analytics:", error);
    throw error;
  }
};