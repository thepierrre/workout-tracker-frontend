import { useNavigate } from "react-router-dom";
import { generateRandomString } from "../../util/DUMMY_DATA";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Category } from "../../interfaces/category.interface";
import { addExercise } from "../../features/exercises/exercisesSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ExerciseForm from "../../components/forms/ExerciseForm";
import Container from "../../components/UI/Container";

import { Flex, Heading, IconButton, Box } from "@chakra-ui/react";

const NewExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  if (!user) {
    return;
  }

  const onSubmit = (data: { name: string }, selectedCategories: Category[]) => {
    const exerciseToAdd = {
      id: generateRandomString(5),
      name: data.name,
      categories: selectedCategories,
      userId: user.id,
    };

    dispatch(addExercise(exerciseToAdd));
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
