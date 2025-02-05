import axiosInstance from ".";

export const addToWishListAPI = (productId) => {
    const response = axiosInstance.post(`/users/wishlist`, {
        productId: productId
    })
    return response;
}
export const getWishListAPI = () => {
    const response = axiosInstance.get(`/users/wishlist`)
    return response;
}
export const updateUserWishlistAPI = () => {
    const response = axiosInstance.patch(`/users/wishlist`, {
        productIds
    })
    return response;
}
export const deleteProductFromWishlistAPI = (productId) => {
    const response = axiosInstance.delete(`/users/wishlist/${productId}`)
    return response;
}