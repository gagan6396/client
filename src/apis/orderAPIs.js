import axiosInstance from ".";

export const createOrderAPI = ({ products, shippingAddressId, paymentMethod, addressSnapshot }) => {
    const response = axiosInstance.post(`/orders/`, {
        products, shippingAddressId, paymentMethod, addressSnapshot
    })
    return response;
}
export const getOrderByIdAPI = (orderId) => {
    const response = axiosInstance.get(`/orders/${orderId}`)
    return response;
}
export const getUserOrdersAPI = () => {
    const response = axiosInstance.get(`/users/orders`)
    return response;
}
export const getUserOrderHistoryAPI = () => {
    const response = axiosInstance.get(`/users/orders/history`)
    return response;
}
export const cancelOrderAPI = (orderId) => {
    const response = axiosInstance.post(`/orders/${orderId}/cancel`)
    return response;
}
export const returnOrderAPI = (orderId) => {
    const response = axiosInstance.post(`/orders/${orderId}/return`, {
        reason,
        products,
    })
    return response;
}
export const exchangeOrderAPI = (orderId) => {
    const response = axiosInstance.post(`/orders/${orderId}/exchange`, {
        reason,
        products,
    })
    return response;
}
export const trackOrderAPI = (orderId) => {
    const response = axiosInstance.get(`/orders/track/${orderId}`, {
        reason,
        products,
    })
    return response;
}