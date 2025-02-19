import axiosInstance from ".";

export const getCategoriesAPI = () => {
    const response = axiosInstance.get('/categories')
    return response;
}
export const getProductByCategoryAPI = (categoryId) => {
    const response = axiosInstance.get(`/categories/category/${categoryId}`)
    return response;
}
export const getProductBySubCategoryAPI = (subCategoryId) => {
    const response = axiosInstance.get(`/categories/subcategory/${subCategoryId}`)
    return response;
}