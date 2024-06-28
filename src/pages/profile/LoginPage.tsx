import { useDispatch } from "react-redux";
import { User } from "../../interfaces/user.interface";
import axios from "axios";
import axiosInstance from "../../util/axiosInstance";
import { setUser } from "../../features/auth/authenticatedUserSlice";
import { Heading, Text, Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import AuthForm, { FormValues } from "../../components/forms/AuthForm";
import WideButton from "../../components/UI/WideButton";
import Container from "../../components/UI/Container";
import Welcome from "./Welcome";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();

  const resolver: Resolver<FormValues> = async (values) => {
    const errors = {
      ...(values.username
        ? {}
        : {
            username: {
              type: "required",
              message: "Username is required.",
            },
          }),
      ...(values.password
        ? {}
        : {
            password: {
              type: "required",
              message: "Password is required.",
            },
          }),
    };

    return {
      values: values.username && values.password ? values : {},
      errors: errors,
    };
  };

  const {
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosInstance.post("auth/login", {
        username: data.username,
        password: data.password,
      });

      const userResponse = await axiosInstance.get("users/me");

      const authenticatedUser: User = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        password: "",
        email: userResponse.data.email,
        routines: userResponse.data.routines || [],
        workoutSessions: userResponse.data.workoutSessions || [],
        exercises: userResponse.data.exercises || [],
      };

      dispatch(setUser(authenticatedUser));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("password", {
          type: "manual",
          message: error.response.data,
        });
      } else {
        setError("password", {
          type: "manual",
          message: "Unexpected error: " + error,
        });
      }
    }
  };

  return (
    <Container>
      <Welcome />
      <Heading fontSize="xl" mb={1}>
        Sign in to your account
      </Heading>
      <Flex gap={1}>
        <Text fontSize="lg" mb={3}>
          No account?
        </Text>
        <Link to="/sign-up">
          <Text fontSize="lg" mb={3} color="lightblue" fontWeight="bold">
            Create one!
          </Text>
        </Link>
      </Flex>
      <AuthForm
        onSubmit={onSubmit}
        initialUsername=""
        initialPassword=""
        buttonText="Sign in"
        isRegistration={false}
        setFormError={setError}
        errors={errors}
      />
    </Container>
  );
};

export default LoginPage;
