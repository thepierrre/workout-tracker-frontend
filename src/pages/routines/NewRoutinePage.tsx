import { useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import SubmitOrCancelButton from "../../components/UI/buttons/SubmitOrCancelButton";
import MainHeading from "../../components/UI/text/MainHeading";
import RoutineForm from "../../components/forms/routineForm/RoutineForm";
import { FormValues } from "../../components/forms/routineForm/RoutineForm";
import { Exercise } from "../../interfaces/exercise.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import { addRoutine } from "../../store/routines/routinesSlice";

const NewRoutinePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittingInProgress, setSubmittingInProgress] =
    useState<boolean>(false);
  // const { user, loading: loadingUser } = useSelector(
  //   (state: RootState) => state.authenticatedUser,
  // );
  const { routineExercises: localRoutineExercises } = useSelector(
    (state: RootState) => state.localRoutine || [],
  );
  // const { exercises, loading: loadingExercises } = useSelector(
  //   (state: RootState) => state.exercises,
  // );

  const routineFormRef = useRef<{ submit: () => void }>(null);

  const onSubmit = async (
    data: FormValues,
    setError: UseFormSetError<FormValues>,
  ) => {
    const exercises: Omit<Exercise, "temporaryId">[] =
      localRoutineExercises.map((ex) => {
        const workingSets = ex.workingSets?.map((set) => {
          return {
            ...set,
          } as Omit<WorkingSet, "id" | "creationTimedate">;
        });

        return {
          ...ex,
          workingSets,
        } as Omit<Exercise, "temporaryId">;
      });

    const routineToAdd = {
      name: data.name,
      routineExercises: exercises,
    };

    try {
      console.log(routineToAdd);
      setSubmittingInProgress(true);
      await dispatch(addRoutine(routineToAdd)).unwrap();
      navigate("/routines", { state: { routine: "created" } });
    } catch (error) {
      if (typeof error === "string") {
        setServerError(error);
        setError("name", { type: "server", message: error });
      }
    } finally {
      setSubmittingInProgress(false);
    }
  };

  // if (loadingUser) {
  //   return <SpinnerComponent />;
  // }

  return (
    <Container>
      <SubmitOrCancelButton
        text="CANCEL"
        top="4.7rem"
        left={["2rem", "4rem", "8rem", "20rem", "30rem"]}
        link="/routines"
      />

      <MainHeading text="New routine" />
      {submittingInProgress && (
        <SpinnerComponent mt={0} mb={4} text="Adding routine..." />
      )}
      <SubmitOrCancelButton
        text="CREATE"
        top="4.7rem"
        right={["2rem", "4rem", "8rem", "20rem", "30rem"]}
        onClick={() => routineFormRef.current?.submit()}
      />

      <RoutineForm
        initialName=""
        newRoutine={true}
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
