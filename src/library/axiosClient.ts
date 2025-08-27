"use client";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://jobsite-api.wishalpha.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});




axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Request with token:", token.substring(0, 20) + "...");
    // console.log("Request URL:", config.baseURL + config.url);
    console.log("Request method:", config.method);
  } else {
    console.log("No token found in session storage");
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response, config } = error;
      console.error("Axios response error:", {
        status: response?.status,
        statusText: response?.statusText,
        data: response?.data,
        url: config?.url,
        method: config?.method,
        baseURL: config?.baseURL
      });
      
      if (response?.status === 401) {
        console.log("401 error - removing token");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("userName");
      } else if (response?.status === 403) {
        console.log("403 error - forbidden access");
      }
    } catch (e) {
      console.log("Error in interceptor:", e);
    }
    throw error;
  }
);

export default axiosClient;
