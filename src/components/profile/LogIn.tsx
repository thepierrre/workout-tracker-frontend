import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authenticatedUserSlice";
import { users } from "../../util/DUMMY_DATA";

import AuthForm, { FormValues } from "../forms/AuthForm";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    dispatch(setUser(users[0]));
    // dispatch(addExercise(exerciseToAdd));
    navigate("/workouts");
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
