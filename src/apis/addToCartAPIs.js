import axiosInstance from ".";

export const addToCartAPI = ({ productId, quantity, skuParameters }) => {
    const response = axiosInstance.post(`/cart/${productId}`, {
        quantity, skuParameters
    })
    return response;
}
export const getAddTOCartProductsAPI = () => {
    const response = axiosInstance.get(`/cart`)
    return response;
}
export const deleteToCartAPI = (productId) => {
    const response = axiosInstance.delete(`/cart/${productId}`)
    return response;
}
export const updateToCartAPI = () => {
    const response = axiosInstance.put(`/cart/${productId}`, {
        quantity, skuParameters
    })
    return response;
}