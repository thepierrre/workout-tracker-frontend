import { useRef } from "react";
import { useForm, Resolver } from "react-hook-form";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Flex,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Heading,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

type FormValues = {
  name: string;
  category: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Exercise is required.",
          },
        }
      : {},
  };
};

const NewExercise = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Flex direction="column" gap={4}>
      <Heading fontSize="lg" textAlign="center">
        New exercise
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <Input
            {...register("name")}
            w="95vw"
            bg="#404040"
            borderColor="transparent"
            _focusVisible={{
              borderWidth: "1px",
              borderColor: "lightblue",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Name"
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Input
          {...register("category")}
          mt={4}
          w="95vw"
          bg="#404040"
          borderColor="transparent"
          _focusVisible={{
            borderWidth: "1px",
            borderColor: "lightblue",
          }}
          _placeholder={{ color: "#B3B3B3" }}
          placeholder="Category"
        />
      </form>
      <Flex justify="center" gap={2}>
        <AddCircleIcon />
        <Text>Category</Text>
      </Flex>
      <Button w="95vw" bg="lightblue" textColor="#353935" type="submit">
        Create
      </Button>
    </Flex>
  );
};

export default NewExercise;
