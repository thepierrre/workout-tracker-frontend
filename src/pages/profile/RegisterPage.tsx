import { useRef } from "react";
import { Link } from "react-router-dom";
import WideButton from "../../components/UI/WideButton";
import Container from "../../components/UI/Container";
import {
  Heading,
  Flex,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  useToast,
  ToastId,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import axiosInstance from "../../util/axiosInstance.ts";
import Welcome from "../../components/profile/Welcome";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      ? values.password.length < 8
        ? {
            password: {
              type: "pattern",
              message: "Enter a password with at least 8 characters.",
            },
          }
        : {}
      : {
          password: {
            type: "required",
            message: "Enter a password.",
          },
        }),
    ...(values.email
      ? !emailPattern.test(values.email)
        ? {
            email: {
              type: "pattern",
              message: "Enter a valid email.",
            },
          }
        : {}
      : {
          email: {
            type: "required",
            message: "Enter an email.",
          },
        }),
  };

  return {
    values: values.username && values.password && values.email ? values : {},
    errors: errors,
  };
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const addToast = () => {
    toastIdRef.current = toast({
      position: "bottom",
      duration: 5000,
      render: () => (
        <Flex
          color="white"
          direction="column"
          align="center"
          justify="center"
          bg="#2F855A"
          borderRadius={10}
          p={2}
          fontSize="lg"
          mb={10}
        >
          <Text>Account created!</Text>
          <a href="/" style={{ fontWeight: "bold", color: "white" }}>
            Sign in.
          </a>
        </Flex>
      ),
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      if (response.data === `User "${data.username}" registered.`) {
        addToast();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (
          message ===
          `User with the username "${data.username}" already exists.`
        ) {
          setError("username", {
            type: "server",
            message: "This username is already taken.",
          });
        } else if (
          message === `User with the email "${data.email}" already exists.`
        ) {
          setError("email", {
            type: "server",
            message: "This email is already taken.",
          });
        }
      }
    }
  };

  return (
    <Container>
      <Welcome />
      <Heading fontSize="xl" mb={1}>
        Create an account
      </Heading>
      <Flex gap={1}>
        <Text fontSize="lg" mb={3}>
          Already a member?
        </Text>
        <Link to="/">
          <Text fontSize="lg" mb={3} color="lightblue" fontWeight="bold">
            Sign in!
          </Text>
        </Link>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={3} mt={3}>
          <FormControl isInvalid={!!errors?.username}>
            <Input
              {...register("username")}
              w="95vw"
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

          <FormControl isInvalid={!!errors?.email}>
            <Input
              {...register("email")}
              w="95vw"
              bg="#404040"
              borderWidth="1px"
              borderColor="#CBD5E0"
              _focus={{
                boxShadow: "none",
                borderWidth: "2px",
                borderColor: errors.email ? "#E53E3E" : "#3182CE",
              }}
              _placeholder={{ color: "#B3B3B3" }}
              placeholder="Email"
            />
            <FormErrorMessage>
              {errors?.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.password}>
            <Input
              {...register("password")}
              w="95vw"
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

          <WideButton type="submit">Create account</WideButton>
        </Flex>
      </form>
    </Container>
  );
};

export default RegisterPage;
