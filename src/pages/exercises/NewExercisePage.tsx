import { useEffect, useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import SubmitOrCancelButton from "../../components/UI/buttons/SubmitOrCancelButton";
import MainHeading from "../../components/UI/text/MainHeading";
import ExerciseForm, {
  FormValues,
} from "../../components/forms/exerciseForm/ExerciseForm";
import { Category } from "../../interfaces/category.interface";
import { fetchCategories } from "../../store/exercises/categoriesSlice";
import { addExercise } from "../../store/exercises/exercisesSlice";
import { fetchLocalCategories } from "../../store/exercises/localCategoriesSlice";

const NewExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const [submittingInProgress, setSubmittingInProgress] =
    useState<boolean>(false);
  const categoriesState = useSelector(
    (state: RootState) => state.localCategories,
  );

  useEffect(() => {
    //dispatch(fetchCategories());
    dispatch(fetchLocalCategories());
  }, [dispatch]);

  const exerciseFormRef = useRef<{ submit: () => void }>(null);

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: FormValues,
    selectedCategories: Category[],
    setError: UseFormSetError<FormValues>,
  ) => {
    const exerciseToAdd = {
      name: data.name,
      equipment: data.equipment,
      categories: selectedCategories,
      isDefault: false,
      userId: user.id,
    };

    try {
      setSubmittingInProgress(true);
      await dispatch(addExercise(exerciseToAdd)).unwrap();
      navigate("/exercises", { state: { exercise: "created" } });
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

  if (categoriesState.loading) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <SubmitOrCancelButton
        text="CANCEL"
        top="4.7rem"
        left={["2rem", "4rem", "8rem", "20rem", "30rem"]}
        link="/exercises"
      />

      <MainHeading text="New exercise" />
      {submittingInProgress && <SpinnerComponent mt={0} mb={4} />}
      <SubmitOrCancelButton
        text="CREATE"
        top="4.7rem"
        right={["2rem", "4rem", "8rem", "20rem", "30rem"]}
        onClick={() => exerciseFormRef.current?.submit()}
      />

      <ExerciseForm
        ref={exerciseFormRef}
        initialName=""
        initialEquipment="BODYWEIGHT"
        initialSelectedCategories={[]}
        onSubmit={onSubmit}
        buttonText="Create"
        serverError={serverError}
      ></ExerciseForm>
    </Container>
  );
};

export default NewExercisePage;
