import axiosInstance from ".";

export const getUserProfileAPI = () => {
  const response = axiosInstance.get(`/users/profile`);
  return response;
};
export const updateUserProfileAPI = ({
  first_name,
  last_name,
  email,
  phone,
  profileImage,
  shoppingAddress,
}: any) => {
  const response = axiosInstance.patch(`/users/profile`, {
    first_name,
    last_name,
    email,
    phone,
    profileImage,
    shoppingAddress,
  });
  return response;
};
export const getUserLoyaltiPointsAPI = () => {
  const response = axiosInstance.get(`/users/loyalti`);
  return response;
};
export const RedeeemLoyaltiPointsAPI = (RedeeemLoyaltiPoints: any) => {
  const response = axiosInstance.patch(`/users/loyalti`, {
    RedeeemLoyaltiPoints,
  });
  return response;
};
export const FetchUserNotificationAPI = () => {
  const response = axiosInstance.get(`/users/notification`);
  return response;
};
