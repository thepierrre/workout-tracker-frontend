import { useState } from "react";
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
import { UseFormSetError } from "react-hook-form";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const NewRoutinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser
  );

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: { name: string },
    selectedExercises: Exercise[],
    setError: UseFormSetError<{ name: string }>
  ) => {
    const routineToAdd: Omit<Routine, "id"> = {
      name: data.name,
      exerciseTypes: selectedExercises,
      userId: user.id,
    };

    try {
      await dispatch(addRoutine(routineToAdd)).unwrap();
      navigate("/routines", { state: { routine: "created" } });
    } catch (error) {
      if (typeof error === "string") {
        let errorMessage = error;
        setServerError(error);
        setError("name", { type: "server", message: errorMessage });
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loadingUser) {
    return <SpinnerComponent />;
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
          Add a new routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm
        initialSelectedExercises={[]}
        onSubmit={onSubmit}
        buttonText="Create"
        serverError={serverError}
      ></RoutineForm>
    </Container>
  );
};

export default NewRoutinePage;
