import { generateRandomString } from "../../util/DUMMY_DATA";
import { useForm, Resolver } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Exercise } from "../../interfaces/exercise.interface";
import { addExercise } from "../../features/exercises/exercisesSlice";

import {
  Flex,
  Button,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

type FormValues = {
  name: string;
  categories: string[];
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

  const usr = useSelector((state: RootState) => state.authenticatedUser.user);
  const dispatch = useDispatch();

  const convertFormDataToExercise = (formData: FormValues): Exercise => {
    return {
      id: generateRandomString(5),
      name: formData.name,
      categories: formData.categories,
      userId: usr.id,
    };
  };

  const onSubmit = (data: FormValues) => {
    const notEmptyCategories = data.categories.filter(
      (category) => category.trim() !== ""
    );
    const updatedData = {
      ...data,
      categories: notEmptyCategories,
    };

    console.log(updatedData);

    const exerciseToAdd = convertFormDataToExercise(updatedData);
    dispatch(addExercise(exerciseToAdd));
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
        <Heading fontSize="lg" textAlign="center" mt={4} mb={4}>
          Categories
        </Heading>
        <Flex direction="column" gap={2}>
          {Array(3)
            .fill("")
            .map((_, index) => (
              <Input
                key={index}
                {...register(`categories.${index}`)}
                w="95vw"
                bg="#404040"
                borderColor="transparent"
                _focusVisible={{
                  borderWidth: "1px",
                  borderColor: "lightblue",
                }}
                _placeholder={{ color: "#B3B3B3" }}
                placeholder={`Category ${index + 1} (optional)`}
              />
            ))}
        </Flex>
        <Button
          w="95vw"
          bg="lightblue"
          textColor="#353935"
          type="submit"
          mt={4}
        >
          Create
        </Button>
      </form>
    </Flex>
  );
};

export default NewExercise;
