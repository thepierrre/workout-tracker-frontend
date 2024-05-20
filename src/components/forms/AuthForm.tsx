import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { FormControl, FormErrorMessage, Input, Flex } from "@chakra-ui/react";
import WideButton from "../UI/WideButton";

export interface FormValues {
  username: string;
  password: string;
  email?: string;
}

interface Props {
  initialUsername: string;
  initialPassword: string;
  initialEmail?: string;
  buttonText: string;
  onSubmit: (data: FormValues) => void;
  isRegistration?: boolean; // New prop to indicate registration form
}

const AuthForm: React.FC<Props> = ({
  initialUsername,
  initialPassword,
  initialEmail,
  buttonText,
  onSubmit,
  isRegistration,
}) => {
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
      ...(isRegistration && !values.email
        ? {
            email: {
              type: "required",
              message: "Email is required for registration.",
            },
          }
        : {}),
    };

    return {
      values: values.username && values.password ? values : {},
      errors: errors,
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Flex direction="column" gap={3} mt={3}>
        <FormControl isInvalid={!!errors.username}>
          <Input
            {...register("username")}
            w="95vw"
            bg="#404040"
            borderColor="transparent"
            _focusVisible={{
              borderWidth: "1px",
              borderColor: "lightblue",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Username"
            defaultValue={initialUsername}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        {isRegistration && (
          <FormControl isInvalid={!!errors.email}>
            <Input
              {...register("email")}
              w="95vw"
              bg="#404040"
              borderColor="transparent"
              _focusVisible={{
                borderWidth: "1px",
                borderColor: "lightblue",
              }}
              _placeholder={{ color: "#B3B3B3" }}
              placeholder="Email"
              defaultValue={initialEmail}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!!errors.password}>
          <Input
            {...register("password")}
            w="95vw"
            bg="#404040"
            borderColor="transparent"
            _focusVisible={{
              borderWidth: "1px",
              borderColor: "lightblue",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Password"
            type="password"
            defaultValue={initialPassword}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <WideButton type="submit">{buttonText}</WideButton>
      </Flex>
    </form>
  );
};

export default AuthForm;
