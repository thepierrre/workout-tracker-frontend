import { getCookie } from "typescript-cookie";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
