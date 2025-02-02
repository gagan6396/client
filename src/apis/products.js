import axiosInstance from ".";

export const getProductsAPI = () => {
    const response = axiosInstance.get('/products')
    return response;
}
export const getProductByIdAPI = (id) => {
    const response = axiosInstance.get(`/products/${id}`)
    return response;
}