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
import ExerciseForm, {
  FormValues,
} from "../../components/forms/exerciseForm/ExerciseForm";
import { Category } from "../../interfaces/category.interface";
import { Exercise } from "../../interfaces/exercise.interface";
import PageNotFound from "../../pages/PageNotFound";
import { fetchCategories } from "../../store/exercises/categoriesSlice";
import { removeExercise } from "../../store/exercises/exercisesSlice";
import { updateExercise } from "../../store/exercises/exercisesSlice";

const SingleExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { exerciseId } = useParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittingInProgress, setSubmittingInProgress] =
    useState<boolean>(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null,
  );

  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser,
  );
  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises,
  );

  const exerciseFormRef = useRef<{ submit: () => void }>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const currentExercise = exercises.find(
    (exercise) => exercise.id === exerciseId,
  );

  if (loadingUser || loadingExercises) {
    return <SpinnerComponent />;
  }

  if (!user) {
    return null;
  }

  if (!currentExercise) {
    return <PageNotFound />;
  }

  const onSubmit = async (
    data: FormValues,
    selectedCategories: Category[],
    setError: UseFormSetError<FormValues>,
  ) => {
    const currentIndex = exercises.indexOf(currentExercise);

    const exerciseToUpdate = {
      id: currentExercise.id,
      name: data.name,
      equipment: data.equipment,
      categories: selectedCategories,
      isDefault: false,
      userId: user.id,
    };

    const compareOldAndNewEx = () => {
      return (
        exerciseToUpdate.id === currentExercise.id &&
        exerciseToUpdate.name === currentExercise.name &&
        _.isEqual(exerciseToUpdate.categories, currentExercise.categories)
      );
    };

    try {
      setSubmittingInProgress(true);
      if (currentIndex !== -1) {
        await dispatch(updateExercise(exerciseToUpdate)).unwrap();
      }
      if (compareOldAndNewEx()) {
        navigate("/exercises");
      } else {
        navigate("/exercises", { state: { exercise: "updated" } });
      }
    } catch (error) {
      if (typeof error === "string") {
        let errorMessage = error;
        setServerError(error);
        setError("name", { type: "server", message: errorMessage });
      }
    } finally {
      setSubmittingInProgress(false);
    }
  };

  const handleRemoveExercise = async () => {
    if (exerciseToDelete && exerciseToDelete.id) {
      await dispatch(removeExercise(exerciseToDelete.id));
      setExerciseToDelete(null);
      onClose();
      navigate("/exercises", { state: { exercise: "removed" } });
    }
  };

  if (loadingUser || loadingExercises) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Container>
        <SubmitOrCancelButton
          text="CANCEL"
          top="4.7rem"
          left="2rem"
          link="/exercises"
        />

        <MainHeading text="Edit exercise" />
        {submittingInProgress && <SpinnerComponent mt={0} mb={4} />}
        <SubmitOrCancelButton
          text="SAVE"
          top="4.7rem"
          right="3rem"
          onClick={() => exerciseFormRef.current?.submit()}
        />

        <DeleteButton
          onOpen={onOpen}
          currentExercise={currentExercise}
          setExerciseToDelete={setExerciseToDelete}
        />

        <ExerciseForm
          ref={exerciseFormRef}
          initialName={currentExercise.name}
          initialEquipment={currentExercise.equipment}
          initialSelectedCategories={currentExercise.categories}
          buttonText="Update"
          onSubmit={onSubmit}
          serverError={serverError}
        ></ExerciseForm>
      </Container>
      <DeletionModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleRemoveExercise}
        elementType="exercise"
      />
    </>
  );
};

export default SingleExercisePage;
