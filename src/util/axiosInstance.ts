import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workout-tracker-service-2.onrender.com/api/",
  //baseURL: "http://localhost:8080/api/",
  //baseURL: "https://piotrs-workout-tracker-73c6b58b5e5a.herokuapp.com/api/",
  withCredentials: true,
});

export default axiosInstance;
