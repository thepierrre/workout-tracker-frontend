import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { Category } from "../../interfaces/category.interface";
import { addExercise } from "../../features/exercises/exercisesSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ExerciseForm from "../../components/forms/ExerciseForm";
import Container from "../../components/UI/Container";

import { Flex, Heading, IconButton, Box } from "@chakra-ui/react";

const NewExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: { name: string },
    selectedCategories: Category[]
  ) => {
    const exerciseToAdd = {
      name: data.name,
      categories: selectedCategories,
      userId: user.id,
    };

    console.log(exerciseToAdd);

    try {
      await dispatch(addExercise(exerciseToAdd)).unwrap();
      navigate("/exercises");
    } catch (error) {
      console.error("Failed to add exercise: ", error);
    }
    navigate("/exercises");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Flex align="center" w="100%" mb={3}>
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
      <ExerciseForm onSubmit={onSubmit} buttonText="Create"></ExerciseForm>
    </Container>
  );
};

export default NewExercisePage;
