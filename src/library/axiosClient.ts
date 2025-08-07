"use client";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});




axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status == 401) {
        sessionStorage.removeItem("accessToken");
      }
    } catch (e) {
      console.log(e);
      // console.error("Axios error:", e.message);
      // console.error("Axios config:", e.config);
      // console.error("Axios request:", e.request);
    }
    throw error;
  }
);

export default axiosClient;
