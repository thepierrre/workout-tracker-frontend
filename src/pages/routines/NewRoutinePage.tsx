import { useNavigate } from "react-router-dom";
import { Exercise } from "../../interfaces/exercise.interface";
import { RootState, AppDispatch } from "../../app/store";
import { Routine } from "../../interfaces/routine.interface";
import { addRoutine } from "../../features/routines/routinesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Flex, IconButton, Heading, Box, Spinner } from "@chakra-ui/react";
import RoutineForm from "../../components/forms/RoutineForm";
import Container from "../../components/UI/Container";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const NewRoutinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const exercisesState = useSelector((state: RootState) => state.exercises);

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

  const handleGoBack = () => {
    navigate(-1);
  };

  if (exercisesState.loading) {
    return (
      <Container>
        <Flex align="center" justify="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

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

        <Heading w="70%" fontSize="lg" textAlign="center" color="white">
          New routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm
        initialSelectedExercises={[]}
        onSubmit={onSubmit}
        buttonText="Create"
      ></RoutineForm>
    </Container>
  );
};

export default NewRoutinePage;
