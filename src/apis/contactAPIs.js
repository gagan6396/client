import axiosInstance from ".";

export const createContactAPI = ({ name, phone, category, message }) => {
    const response = axiosInstance.post('/contact/contact', {
        name, phone, category, message
    })
    return response;
}
