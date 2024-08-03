import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RoutineExercise } from "interfaces/routineExercise.interface";
import { useEffect, useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import _ from "underscore";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import DeletionModal from "../../components/UI/DeletionModal";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import { FormValues } from "../../components/forms/RoutineForm";
import RoutineForm from "../../components/forms/RoutineForm";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import {
  removeRoutine,
  updateRoutine,
} from "../../features/routines/routinesSlice";
import { Exercise } from "../../interfaces/exercise.interface";
import { Routine } from "../../interfaces/routine.interface";

const SingleRoutinePage = () => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [routineToDelete, setRoutineToDelete] = useState<Routine | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { routines, loading: loadingRoutines } = useSelector(
    (state: RootState) => state.routines,
  );

  const { name: routineName, routineExercises: localRoutineExercises } =
    useSelector((state: RootState) => state.localRoutine);

  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises,
  );

  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser,
  );

  const routineFormRef = useRef<{ submit: () => void }>(null);

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  const currentRoutine: Routine | undefined = routines.find(
    (routine) => routine.id === routineId,
  );

  if (!currentRoutine) {
    return <Text>Routine not found.</Text>;
  }

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: { name: string },
    setError: UseFormSetError<FormValues>,
  ) => {
    const currentIndex = routines.indexOf(currentRoutine);

    const exercises: RoutineExercise[] = localRoutineExercises.map((ex) => ({
      ...ex,
      workingSets: ex.workingSets.map((set) => ({
        ...set,
        id: undefined,
        creationTimedate: undefined,
      })),
    }));

    const routineToUpdate = {
      id: currentRoutine.id,
      name: data.name,
      routineExercises: exercises,
      userId: user.id,
    };

    console.log(routineToUpdate);

    const compareOldAndNewRoutine = () => {
      return (
        routineToUpdate.id === currentRoutine.id &&
        routineToUpdate.name === currentRoutine.name &&
        _.isEqual(
          routineToUpdate.routineExercises,
          currentRoutine.routineExercises,
        )
      );
    };

    try {
      if (currentIndex !== -1) {
        await dispatch(updateRoutine(routineToUpdate)).unwrap();
      }
      if (compareOldAndNewRoutine()) {
        navigate("/routines");
      } else {
        navigate("/routines", { state: { routine: "updated" } });
      }
    } catch (error) {
      if (typeof error === "string") {
        let errorMessage = error;
        setServerError(error);
        setError("name", { type: "server", message: errorMessage });
      }
    }
  };

  const handleOpenModal = (routine: Routine) => {
    setRoutineToDelete(routine);
    onOpen();
  };

  const handleRemoveRoutine = async () => {
    if (routineToDelete) {
      await dispatch(removeRoutine(routineToDelete.id));
      setRoutineToDelete(null);
      onClose();
      navigate("/routines", { state: { routine: "removed" } });
    }
  };

  const exercisesFromRoutineExercises: Exercise[] =
    currentRoutine?.routineExercises
      ?.map((re: RoutineExercise) =>
        exercises.find((ex) => ex.name === re.name),
      )
      .filter((ex): ex is Exercise => ex !== undefined)
      .map((ex: Exercise) => ({
        ...ex,
        id: ex.id,
        name: ex.name,
        categories: ex.categories,
        isDefault: ex.isDefault,
        repsOrTimed: ex.repsOrTimed,
      })) || [];

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loadingRoutines || loadingUser) {
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
          Edit routine
        </Heading>

        <Box
          position="absolute"
          top="4.7rem"
          right="3rem"
          onClick={() => routineFormRef.current?.submit()}
        >
          <Text fontWeight="bold" color="#48BB78">
            SAVE
          </Text>
        </Box>
      </Flex>
      <RoutineForm
        newRoutine={false}
        routineId={currentRoutine.id}
        ref={routineFormRef}
        initialName={currentRoutine.name}
        initialRoutineExercises={currentRoutine.routineExercises}
        initialSelectedExercises={exercisesFromRoutineExercises}
        onSubmit={onSubmit}
        buttonText="Update"
        serverError={serverError}
      ></RoutineForm>
      <Flex
        gap={1}
        justify="center"
        color="lightblue"
        onClick={() => handleOpenModal(currentRoutine)}
        mt={3}
      >
        <RemoveCircleOutlineIcon />
        <Text fontWeight="bold">Delete routine</Text>
        <DeletionModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleRemoveRoutine}
          elementType="routine"
        />
      </Flex>
    </Container>
  );
};

export default SingleRoutinePage;
