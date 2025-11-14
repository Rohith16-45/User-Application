import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import { API_PATHS } from "./apiEndpoints";
import { jwtDecode } from "jwt-decode";

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

export const login = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, body);
    const token = response.data.data.token;

    const decoded = jwtDecode(token);
    const userId = decoded.id;
    const userData = {
      id: userId,
      name: response.data.data.name,
      email: response.data.data.email,
      token,
    };

    localStorage.setItem("loginToken", token);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    showToast({
      message: `Welcome back ${response.data.data.name}`,
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

export const getUser = async (id) => {
  try {
    const token = localStorage.getItem("loginToken");
    const response = await axiosInstance.get(
      `${API_PATHS.AUTH.GET_USER}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Failed to get user..!",
      status: "error",
    });
    throw error;
  }
};

export const getAllUsers = async (pageNumber, pageSize) => {
  try {
    const token = localStorage.getItem("loginToken");
    const response = await axiosInstance.get(
      `${API_PATHS.AUTH.GET_ALL_USERS}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Failed to fetch users..!",
      status: "error",
    });
    throw error;
  }
};

export const updateUser = async (id, body) => {
  try {
    const token = localStorage.getItem("loginToken");
    const response = await axiosInstance.put(
      `${API_PATHS.AUTH.UPDATE_USER}/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showToast({
      message: "User Updated successfully..!",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Failed to Update user..!",
      status: "error",
    });
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("loginToken");
    const response = await axiosInstance.delete(
      `${API_PATHS.AUTH.DELETE_USER}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showToast({
      message: "User Deleted successfully..!",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Failed to Delete user..!",
      status: "error",
    });
    throw error;
  }
};
