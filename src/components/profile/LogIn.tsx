import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
// import Cookies from "js-cookie";
import axiosInstance from "../../util/axiosInstance";
import { setCookie } from "typescript-cookie";
import { setUser } from "../../features/auth/authenticatedUserSlice";
import { users } from "../../util/DUMMY_DATA";

import AuthForm, { FormValues } from "../forms/AuthForm";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    axiosInstance
      .post("auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.accessToken;
        console.log(token);
        setCookie("token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        // Cookies.set("token", token, {
        //   expires: 7,
        //   secure: true,
        //   sameSite: "Strict",
        // });
        // dispatch(setUser({ username: data.username }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const onSubmit = (data: FormValues) => {
  //   console.log(data);
  //   dispatch(setUser(users[0]));
  //   // dispatch(addExercise(exerciseToAdd));
  //   navigate("/workouts");
  // };

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
