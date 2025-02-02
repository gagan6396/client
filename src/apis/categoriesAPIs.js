import axiosInstance from ".";

export const getCategoriesAPI = () => {
    const response = axiosInstance.get('/categories')
    return response;
}
export const getProductByCategoryAPI = (categoryId) => {
    console.log(categoryId, "categoryId");

    const response = axiosInstance.get(`/categories/category/${categoryId}`)
    return response;
}