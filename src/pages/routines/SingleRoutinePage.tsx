import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import _ from "underscore";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  updateRoutine,
  removeRoutine,
} from "../../features/routines/routinesSlice";
import RoutineForm from "../../components/forms/RoutineForm";
import DeletionModal from "../../components/UI/DeletionModal";
import { Exercise } from "../../interfaces/exercise.interface";
import Container from "../../components/UI/Container";
import {
  Flex,
  Heading,
  IconButton,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { UseFormSetError } from "react-hook-form";

import { Routine } from "../../interfaces/routine.interface";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const SingleRoutinePage = () => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [routineToDelete, setRoutineToDelete] = useState<Routine | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { routines, loading: loadingRoutines } = useSelector(
    (state: RootState) => state.routines
  );
  const currentRoutine: Routine | undefined = routines.find(
    (routine) => routine.id === routineId
  );

  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser
  );

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  if (!currentRoutine) {
    return <Text>Routine not found.</Text>;
  }

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: { name: string },
    selectedExercises: Exercise[],
    setError: UseFormSetError<{ name: string }>
  ) => {
    const currentIndex = routines.indexOf(currentRoutine);

    const routineToUpdate = {
      id: currentRoutine.id,
      name: data.name,
      exerciseTypes: selectedExercises,
      userId: user.id,
    };

    const compareOldAndNewRoutine = () => {
      return (
        routineToUpdate.id === currentRoutine.id &&
        routineToUpdate.name === currentRoutine.name &&
        _.isEqual(routineToUpdate.exerciseTypes, currentRoutine.exerciseTypes)
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

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loadingRoutines || loadingUser) {
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

        <Heading w="70%" fontSize="xl" textAlign="center">
          Edit routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm
        initialName={currentRoutine.name}
        initialSelectedExercises={currentRoutine.exerciseTypes}
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
