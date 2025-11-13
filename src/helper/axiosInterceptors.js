import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://node-js-wse4.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("loginToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
