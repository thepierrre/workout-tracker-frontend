import { useParams, useNavigate } from "react-router-dom";
import { Category } from "../../interfaces/category.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Text, Flex, Heading, IconButton, Box } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { editExercise } from "../../features/exercises/exercisesSlice";
import ExerciseForm from "../forms/ExerciseForm";

const SingleExercisePage = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );
  const usr = useSelector((state: RootState) => state.authenticatedUser.user);
  const currentExercise = exercises.find(
    (exercise) => exercise.id === exerciseId
  );
  const dispatch = useDispatch();

  if (!currentExercise) {
    return <Text>Exercise not found.</Text>;
  }

  const onSubmit = (data: { name: string }, selectedCategories: Category[]) => {
    const exerciseToUpdate = {
      id: currentExercise.id,
      name: data.name,
      categories: selectedCategories,
      userId: usr.id,
    };

    const currentIndex = exercises.indexOf(currentExercise);

    if (currentIndex !== -1) {
      dispatch(
        editExercise({
          exercise: exerciseToUpdate,
          index: currentIndex,
        })
      );
    }
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
      gap={5}
      padding={2}
      marginTop={6}
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
          Edit exercise
        </Heading>
        <Box w="16%" />
      </Flex>
      <ExerciseForm
        initialName={currentExercise.name}
        initialSelectedCategories={currentExercise.categories}
        onSubmit={onSubmit}
      ></ExerciseForm>
    </Flex>
  );
};

export default SingleExercisePage;
