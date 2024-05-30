import { useNavigate } from "react-router-dom";
import { Exercise } from "../../interfaces/exercise.interface";
import { RootState, AppDispatch } from "../../app/store";
import { Routine } from "../../interfaces/routine.interface";
import { addRoutine } from "../../features/routines/routinesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Container, Flex, IconButton, Heading, Box } from "@chakra-ui/react";
import RoutineForm from "../../components/forms/RoutineForm";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const NewRoutinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: { name: string },
    selectedExercises: Exercise[]
  ) => {
    const routineToAdd: Omit<Routine, "id"> = {
      name: data.name,
      exerciseTypes: selectedExercises,
      userId: user.id,
    };

    try {
      await dispatch(addRoutine(routineToAdd)).unwrap();
      navigate("/routines");
    } catch (error) {
      console.error("Failed to add routine: ", error);
    }
  };

  // const onSubmit2 = async (
  //   data: { name: string },
  //   selectedCategories: Category[]
  // ) => {
  //   const exerciseToAdd = {
  //     name: data.name,
  //     categories: selectedCategories,
  //     userId: user.id,
  //   };

  //   console.log(exerciseToAdd);

  //   try {
  //     await dispatch(addExercise(exerciseToAdd)).unwrap();
  //     navigate("/exercises");
  //   } catch (error) {
  //     console.error("Failed to add exercise: ", error);
  //   }
  //   navigate("/exercises");
  // };

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
          New routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm onSubmit={onSubmit} buttonText="Create"></RoutineForm>
    </Container>
  );
};

export default NewRoutinePage;
