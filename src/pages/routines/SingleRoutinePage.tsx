import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { removeRoutine } from "../../features/routines/routinesSlice";
import RoutineForm from "../../components/forms/RoutineForm";
import { Exercise } from "../../interfaces/exercise.interface";
import Container from "../../components/UI/Container";
import { Flex, Heading, IconButton, Box, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { Routine } from "../../interfaces/routine.interface";
import { editRoutine } from "../../features/routines/routinesSlice";

const SingleRoutinePage = () => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const routines: Routine[] = useSelector(
    (state: RootState) => state.routines.routines
  );
  const currentRoutine: Routine | undefined = routines.find(
    (routine) => routine.id === routineId
  );

  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  if (!currentRoutine) {
    return <Text>Routine not found.</Text>;
  }

  if (!user) {
    return;
  }

  const onSubmit = (data: { name: string }, selectedExercises: Exercise[]) => {
    const routine: Routine = {
      id: currentRoutine.id,
      name: data.name,
      exercises: selectedExercises,
      userId: user.id,
    };
    if (currentRoutine) {
      const index = routines.findIndex((routine) => routine.id === routineId);
      dispatch(editRoutine({ routine, index }));
      navigate("/routines");
    }
  };

  const handleRemoveRoutine = (routine: Routine) => {
    dispatch(removeRoutine(routine));
    navigate("/routines");
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
          Edit routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm
        initialName={currentRoutine.name}
        initialSelectedExercises={currentRoutine.exercises}
        onSubmit={onSubmit}
        buttonText="Update"
      ></RoutineForm>
      <Flex
        gap={1}
        justify="center"
        color="lightblue"
        onClick={() => handleRemoveRoutine(currentRoutine)}
        mt={3}
      >
        <RemoveCircleOutlineIcon />
        <Text fontWeight="bold">Remove routine</Text>
      </Flex>
    </Container>
  );
};

export default SingleRoutinePage;
