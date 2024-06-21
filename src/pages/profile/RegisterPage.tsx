import { Link } from "react-router-dom";
import WideButton from "../../components/UI/WideButton";
import Container from "../../components/UI/Container";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import AuthForm, { FormValues } from "../../components/forms/AuthForm";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import axiosInstance from "../../util/axiosInstance";

const RegisterPage = () => {
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
      ...(values.email
        ? {}
        : {
            password: {
              type: "required",
              message: "Email is required.",
            },
          }),
    };

    return {
      values: values.username && values.password && values.email ? values : {},
      errors: errors,
    };
  };

  const {
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosInstance.post("auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("username", {
          type: "manual",
          message: error.response.data.message || "An error occurred.",
        });
        setError("password", {
          type: "manual",
          message: error.response.data.message || "An error occurred.",
        });
      } else {
        setError("username", {
          type: "manual",
          message: "Unexpected error: " + error,
        });
        setError("password", {
          type: "manual",
          message: "Unexpected error: " + error,
        });
      }
    }
  };
  return (
    <Container>
      <Heading fontSize="lg">Create an account</Heading>
      <AuthForm
        onSubmit={onSubmit}
        initialUsername=""
        initialPassword=""
        buttonText="Register"
        isRegistration={true}
        setFormError={setError}
        errors={errors}
      />
      <Link to="/profile">
        <WideButton>Existing member? Sign in</WideButton>
      </Link>
    </Container>
  );
};

export default RegisterPage;
