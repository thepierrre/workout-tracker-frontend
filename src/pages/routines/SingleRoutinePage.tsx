import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import PageNotFound from "../pageNotFound/PageNotFound";

const SingleRoutinePage = () => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [routineToDelete, setRoutineToDelete] = useState<Routine | null>(null);
  const [submittingInProgress, setSubmittingInProgress] =
    useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingRoutineInProgress, setDeletingRoutineInProgress] =
    useState<boolean>(false);
  const { routines } = useSelector((state: RootState) => state.routines);

  const { routineExercises: localRoutineExercises } = useSelector(
    (state: RootState) => state.localRoutine || [],
  );

  const { user } = useSelector((state: RootState) => state.authenticatedUser);

  const routineFormRef = useRef<{ submit: () => void }>(null);

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  const currentRoutine: Routine | undefined = routines.find(
    (routine) => routine.id === routineId,
  );

  if (!currentRoutine) {
    return <PageNotFound />;
  }

  // if (!user) {
  //   return;
  // }

  const onSubmit = async (
    data: { name: string },
    setError: UseFormSetError<FormValues>,
  ) => {
    const currentIndex = routines.indexOf(currentRoutine);

    const exercises: Omit<Exercise, "temporaryId">[] =
      localRoutineExercises.map((ex) => {
        const { temporaryId, exerciseOrder, ...restOfExercise } = ex;

        const workingSets = ex.workingSets?.map((set) => {
          const { temporaryId, ...restOfSet } = set;

          return {
            ...restOfSet,
          } as Omit<WorkingSet, "temporaryId">;
        });

        return {
          ...restOfExercise,
          workingSets,
        } as Omit<Exercise, "temporaryId">;
      });

    const routineToUpdate = {
      id: currentRoutine.id,
      name: data.name,
      routineExercises: exercises,
      userId: user?.id,
    };

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
      setSubmittingInProgress(true);
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
        const errorMessage = error;
        setServerError(error);
        setError("name", { type: "server", message: errorMessage });
      }
    } finally {
      setSubmittingInProgress(false);
    }
  };

  const handleRemoveRoutine = async () => {
    if (routineToDelete?.id) {
      try {
        setDeletingRoutineInProgress(true);
        await dispatch(removeRoutine(routineToDelete.id));
        setRoutineToDelete(null);
        onClose();

        navigate("/routines", { state: { routine: "removed" } });
      } catch (error) {
        console.error(error);
      } finally {
        setDeletingRoutineInProgress(false);
      }
    }
  };

  // if (loadingRoutines || loadingUser) {
  //   return <SpinnerComponent />;
  // }

  return (
    <>
      <Container>
        <SubmitOrCancelButton
          text="CANCEL"
          top="4.7rem"
          left={["2rem", "4rem", "8rem", "20rem", "30rem"]}
          link="/routines"
        />

        <MainHeading text="Edit routine" />
        {submittingInProgress && (
          <SpinnerComponent mt={0} mb={4} text="Saving routine..." />
        )}
        <SubmitOrCancelButton
          text="SAVE"
          top="4.7rem"
          right={["2rem", "4rem", "8rem", "20rem", "30rem"]}
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
        deletionInProgress={deletingRoutineInProgress}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleRemoveRoutine}
        elementType="routine"
      />
    </>
  );
};

export default SingleRoutinePage;
