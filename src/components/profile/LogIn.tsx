import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../interfaces/user.interface";
import axios from "axios";
import axiosInstance from "../../util/axiosInstance";
import { setCookie } from "typescript-cookie";
import { setUser } from "../../features/auth/authenticatedUserSlice";

import AuthForm, { FormValues } from "../forms/AuthForm";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const loginResponse = await axiosInstance.post("auth/login", {
        username: data.username,
        password: data.password,
      });

      console.log(loginResponse);

      // const token = loginResponse.data.accessToken;

      // setCookie("token", token, {
      //   expires: 7,
      //   secure: true,
      //   sameSite: "Strict",
      // });

      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${token}`;

      const userResponse = await axiosInstance.get("users/me");

      const authenticatedUser: User = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        password: "", // Do not store the password
        email: userResponse.data.email,
        routines: userResponse.data.routines || [],
        workoutSessions: userResponse.data.workoutSessions || [],
        exercises: userResponse.data.exercises || [],
      };

      dispatch(setUser(authenticatedUser));
      // navigate("/workouts");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      initialUsername=""
      initialPassword=""
      buttonText="Sign in"
      isRegistration={false}
    />
  );
};

export default LogIn;
