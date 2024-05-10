import { useNavigate } from "react-router-dom";
import { generateRandomString } from "../util/DUMMY_DATA";
import { Resolver } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { Category } from "../interfaces/category.interface";
import { addExercise } from "../features/exercises/exercisesSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ExerciseForm from "../components/forms/ExerciseForm";

import { Flex, Heading, IconButton, Box } from "@chakra-ui/react";

type FormValues = {
  name: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Exercise name is required.",
          },
        }
      : {},
  };
};

const NewExercise = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usr = useSelector((state: RootState) => state.authenticatedUser.user);

  const onSubmit = (data: { name: string }, selectedCategories: Category[]) => {
    const exerciseToAdd = {
      id: generateRandomString(5),
      name: data.name,
      categories: selectedCategories,
      userId: usr.id,
    };

    dispatch(addExercise(exerciseToAdd));
    navigate("/exercises");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
      marginTop={5}
    >
      <Flex align="center" w="100%">
        <IconButton
          aria-label="Go back"
          variant="link"
          color="white"
          w="15%"
          icon={<ChevronLeftIcon boxSize={8} />}
          onClick={() => handleGoBack()}
        />

        <Heading w="70%" fontSize="lg" textAlign="center">
          New exercise
        </Heading>
        <Box w="16%" />
      </Flex>
      <ExerciseForm onSubmit={onSubmit}></ExerciseForm>
    </Flex>
  );
};

export default NewExercise;
