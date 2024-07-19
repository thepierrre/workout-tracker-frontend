import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workout-tracker-service-2.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
