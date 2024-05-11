import AuthForm, { FormValues } from "../forms/AuthForm";

const LogIn = () => {
  const onSubmit = (data: FormValues) => {
    console.log(data);
    // dispatch(addExercise(exerciseToAdd));
    // navigate("/exercises");
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
