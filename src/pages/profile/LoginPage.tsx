import {
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { User } from "interfaces/user.interface";
import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch } from "../../app/store.ts";
import Container from "../../components/UI/Container";
import WideButton from "../../components/UI/buttons/WideButton.tsx";
import Welcome from "../../components/profile/Welcome";
import {
  initializeUser,
  setUser,
} from "../../store/auth/authenticatedUserSlice";
import axiosInstance from "../../util/axiosInstance.ts";

type FormValues = {
  username: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors = {
    ...(values.username
      ? {}
      : {
          username: {
            type: "required",
            message: "Enter a username.",
          },
        }),
    ...(values.password
      ? {}
      : {
          password: {
            type: "required",
            message: "Enter a password.",
          },
        }),
  };

  return {
    values: values.username && values.password ? values : {},
    errors: errors,
  };
};

const RegisterPage = () => {
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoginInProgress(true);
      await axiosInstance.post("/auth/login", data);
      await dispatch(initializeUser());
    } catch (error) {
      setLoginInProgress(false);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data;
        if (message === "Invalid username or password.") {
          setError("username", {
            type: "server",
            message: "",
          });
          setError("password", {
            type: "server",
            message: "Invalid username or password.",
          });
        }
      }
    } finally {
      setLoginInProgress(false);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={3} mt={3}>
          <FormControl isInvalid={!!errors?.username}>
            <Input
              {...register("username")}
              w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
              bg="#404040"
              borderWidth="1px"
              borderColor="#CBD5E0"
              _focus={{
                boxShadow: "none",
                borderWidth: "2px",
                borderColor: errors.username ? "#E53E3E" : "#3182CE",
              }}
              _placeholder={{ color: "#B3B3B3" }}
              placeholder="Username"
            />
            <FormErrorMessage>
              {errors?.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.password}>
            <Input
              {...register("password")}
              w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
              bg="#404040"
              borderWidth="1px"
              borderColor="#CBD5E0"
              _focus={{
                boxShadow: "none",
                borderWidth: "2px",
                borderColor: errors.password ? "#E53E3E" : "#3182CE",
              }}
              _placeholder={{ color: "#B3B3B3" }}
              placeholder="Password"
              type="password"
            />
            <FormErrorMessage>
              {errors?.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Flex direction="column" align="center" mt={2}>
            {loginInProgress && <Spinner />}
          </Flex>
          <WideButton
            type="submit"
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          >
            Sign in
          </WideButton>
        </Flex>
      </form>
    </Container>
  );
};

export default RegisterPage;
