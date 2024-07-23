import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "https://my-gym-tracker.work/api/",
  //baseURL: "http://localhost:8080/api/",
  baseURL:
    "https://workout-tracker-piotr-server-82acd6a044c6.herokuapp.com/api/",
  withCredentials: true,
});

export default axiosInstance;
