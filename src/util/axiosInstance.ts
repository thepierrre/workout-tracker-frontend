import axios from "axios";

import { store } from "../app/store";

// import { displayAlert } from "../store/alerts/alertSlice";

const axiosInstance = axios.create({
  //baseURL: "https://api.my-gym-tracker.work/api/",
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       store.dispatch(displayAlert("Unauthorized access. Please log in."));
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
