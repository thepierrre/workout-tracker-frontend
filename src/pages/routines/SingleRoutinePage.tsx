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
import DeleteButton from "../../components/UI/buttons/DeleteButton";
import SubmitOrCancelButton from "../../components/UI/buttons/SubmitOrCancelButton";
import MainHeading from "../../components/UI/text/MainHeading";
import { FormValues } from "../../components/forms/routineForm/RoutineForm";
import RoutineForm from "../../components/forms/routineForm/RoutineForm";
import { Exercise } from "../../interfaces/exercise.interface";
import { Routine } from "../../interfaces/routine.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import { fetchRoutines } from "../../store/routines/routinesSlice";
import {
  removeRoutine,
  updateRoutine,
} from "../../store/routines/routinesSlice";

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

  const { routineExercises: localRoutineExercises } = useSelector(
    (state: RootState) => state.localRoutine,
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

    const exercises: Exercise[] = localRoutineExercises.map((ex) => ({
      ...ex,
      workingSets: ex.workingSets?.map((set: WorkingSet) => ({
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

  const handleRemoveRoutine = async () => {
    if (routineToDelete) {
      await dispatch(removeRoutine(routineToDelete.id));
      setRoutineToDelete(null);
      onClose();
      navigate("/routines", { state: { routine: "removed" } });
    }
  };

  if (loadingRoutines || loadingUser) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Container>
        <SubmitOrCancelButton
          text="CANCEL"
          top="4.7rem"
          left="2rem"
          link="/routines"
        />

        <MainHeading text="Edit routine" />

        <SubmitOrCancelButton
          text="SAVE"
          top="4.7rem"
          right="3rem"
          onClick={() => routineFormRef.current?.submit()}
        />

        <DeleteButton
          onOpen={onOpen}
          currentRoutine={currentRoutine}
          setRoutineToDelete={setRoutineToDelete}
        />

        <RoutineForm
          newRoutine={false}
          routineId={currentRoutine.id}
          ref={routineFormRef}
          initialName={currentRoutine.name}
          initialSelectedExercises={currentRoutine.routineExercises}
          onSubmit={onSubmit}
          buttonText="Update"
          serverError={serverError}
        ></RoutineForm>
      </Container>
      <DeletionModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleRemoveRoutine}
        elementType="routine"
      />
    </>
  );
};

export default SingleRoutinePage;
