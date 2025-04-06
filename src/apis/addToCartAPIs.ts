import axiosInstance from ".";

// Add product to cart with variantId
export const addToCartAPI = ({
    productId,
    variantId,
    quantity,
}: {
    productId: string;
    variantId: string;
    quantity: number;
}) => {
    const response = axiosInstance.post(`/cart/${productId}/${variantId}`, {
        quantity,
    });
    return response;
};

// Get all products in the cart
export const getAddToCartProductsAPI = () => {
    const response = axiosInstance.get(`/cart`);
    return response;
};

// Delete product from cart with variantId
export const deleteToCartAPI = ({
    productId,
    variantId,
}: {
    productId: string;
    variantId: string;
}) => {
    const response = axiosInstance.delete(`/cart/${productId}/${variantId}`);
    return response;
};

// Update product quantity in cart with variantId
export const updateToCartAPI = ({
    productId,
    variantId,
    quantity,
}: {
    productId: string;
    variantId: string;
    quantity: number;
}) => {
    const response = axiosInstance.put(`/cart/${productId}/${variantId}`, {
        quantity,
    });
    return response;
};