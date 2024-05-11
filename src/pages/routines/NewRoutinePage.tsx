import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Exercise } from "../../interfaces/exercise.interface";
import { Routine } from "../../interfaces/routine.interface";
import { addRoutine } from "../../features/routines/routinesSlice";
import { generateRandomString } from "../../util/DUMMY_DATA";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import RoutineForm from "../../components/forms/RoutineForm";
import Container from "../../components/UI/Container";

import { Flex, Box, Heading, IconButton } from "@chakra-ui/react";

const NewRoutinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: { name: string }, selectedExercises: Exercise[]) => {
    const routine: Routine = {
      id: generateRandomString(5),
      name: data.name,
      exercises: selectedExercises,
    };

    dispatch(addRoutine(routine));
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
          New routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm onSubmit={onSubmit} buttonText="Create"></RoutineForm>
    </Container>
  );
};

export default NewRoutinePage;
