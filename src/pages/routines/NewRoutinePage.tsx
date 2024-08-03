import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { RoutineExercise } from "interfaces/routineExercise.interface";
import { useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import RoutineForm from "../../components/forms/RoutineForm";
import { FormValues } from "../../components/forms/RoutineForm";
import { addRoutine } from "../../features/routines/routinesSlice";

const NewRoutinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser,
  );
  const { routineExercises: localRoutineExercises } = useSelector(
    (state: RootState) => state.localRoutine,
  );

  const routineFormRef = useRef<{ submit: () => void }>(null);

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: FormValues,
    setError: UseFormSetError<FormValues>,
  ) => {
    const exercises: RoutineExercise[] = localRoutineExercises.map((ex) => ({
      ...ex,
      workingSets: ex.workingSets.map((set) => ({ ...set, id: undefined })),
    }));
    const routineToAdd = {
      name: data.name,
      routineExercises: exercises,
      userId: user.id,
    };

    console.log("routineToAdd:", routineToAdd);

    try {
      await dispatch(addRoutine(routineToAdd)).unwrap();
      navigate("/routines", { state: { routine: "created" } });
    } catch (error) {
      if (typeof error === "string") {
        setServerError(error);
        setError("name", { type: "server", message: error });
      }
    }
  };

  if (loadingUser) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <Flex
        align="center"
        justifyContent="space-between"
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        mb={3}
      >
        <Box position="absolute" top="4.7rem" left="2rem">
          <Link to="/routines">
            <Text fontWeight="bold" color="#FC8181">
              CANCEL
            </Text>
          </Link>
        </Box>

        <Heading
          w="100%"
          fontSize="2xl"
          textAlign="center"
          color="white"
          mb={5}
        >
          New routine
        </Heading>

        <Box
          position="absolute"
          top="4.7rem"
          right="2rem"
          onClick={() => routineFormRef.current?.submit()}
        >
          <Text fontWeight="bold" color="#48BB78">
            CREATE
          </Text>
        </Box>
      </Flex>
      <RoutineForm
        ref={routineFormRef}
        initialSelectedExercises={[]}
        onSubmit={onSubmit}
        buttonText="Save"
        serverError={serverError}
      />
    </Container>
  );
};

export default NewRoutinePage;
