import { axiosInstance } from "./axiosInstance";

//register user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//login user

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get current user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-users");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update user status
export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `api/users/update-user-status/${id}`,
      {status}
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//forgot password
export const forgotPassword = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/forgot-password', payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
//verify otp and update password
export const verifyOTP = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/verify-otp', payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//update user information
export const UpdateUser = async (id, name, email) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/update-user/${id}`,
      { name, email }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//change password
export const ChangePassword = async (id, password) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/change-password/${id}`,
      { password }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};