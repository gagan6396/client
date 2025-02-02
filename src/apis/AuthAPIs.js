import axiosInstance from ".";


export const RegisterAPI = ({ first_name, last_name, email, phone, password }) => {
    const response = axiosInstance.post('/user/auth/register', {
        first_name, last_name, email, phone, password
    })
    return response;
}
export const LoginAPI = ({ email, password }) => {
    const response = axiosInstance.post('/user/auth/login', {
        email, password
    })
    return response;
}