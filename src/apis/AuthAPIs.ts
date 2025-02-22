import axiosInstance from ".";


// Register a new user
export const RegisterAPI = ({ first_name, last_name, email, phone, password }: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
}) => {
    const response = axiosInstance.post("/user/auth/register", {
        first_name,
        last_name,
        email,
        phone,
        password,
    });
    return response;
};

// Login an existing user
export const LoginAPI = ({ email, password }: { email: string; password: string }) => {
    const response = axiosInstance.post("/user/auth/login", {
        email,
        password,
    });
    return response;
};

// Request a password reset link
export const requestPasswordResetAPI = ({ email }: { email: string }) => {
    const response = axiosInstance.post("/user/auth/request-reset-password", {
        email,
    });
    return response;
};

// Reset password with token
export const resetPasswordAPI = ({ token, newPassword }: { token: string; newPassword: string }) => {
    const response = axiosInstance.post("/user/auth/reset-password", {
        token,
        newPassword,
    });
    return response;
};

// Logout user
export const logOutAPI = () => {
    const response = axiosInstance.post("/user/auth/logout");
    return response;
};