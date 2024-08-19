import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "https://api.my-gym-tracker.work/api/",
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

export default axiosInstance;
