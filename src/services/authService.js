import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import { API_PATHS } from "./apiEndpoints";

export const register = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, body);
    showToast({
      message: "User Registered Successfully..!",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data.message || "Registration Failed..!",
      status: "error",
    });
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.AUTH.GET_USER}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, body);
    showToast({
      message: "User Logged in Successfully..!",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Login Failed..!",
      status: "error",
    });
    throw error;
  }
};

export const emailVerify = async (userId, token) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.AUTH.VERIFY_EMAIL}?token=${token}&userId=${userId}`
    );
    showToast({
      message: "Email Verified Successfully..!",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Verification Failed..!",
      status: "error",
    });
    throw error;
  }
};
