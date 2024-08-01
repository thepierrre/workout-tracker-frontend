import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../features/exercises/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { Category } from "../../interfaces/category.interface";
import { addExercise } from "../../features/exercises/exercisesSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ExerciseForm from "../../components/forms/ExerciseForm";
import Container from "../../components/UI/Container";
import { UseFormSetError } from "react-hook-form";

import { Flex, Heading, IconButton, Box } from "@chakra-ui/react";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const NewExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const categoriesState = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categoriesState.categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesState.categories.length]);

  if (!user) {
    return;
  }

  const onSubmit = async (
    data: { name: string },
    selectedCategories: Category[],
    repsOrTimed: string,
    setError: UseFormSetError<{ name: string }>
  ) => {
    const exerciseToAdd = {
      name: data.name,
      categories: selectedCategories,
      repsOrTimed,
      isDefault: false,
      userId: user.id,
    };

    console.log(exerciseToAdd);

    try {
      await dispatch(addExercise(exerciseToAdd)).unwrap();
      navigate("/exercises", { state: { exercise: "created" } });
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

  if (categoriesState.loading) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <Flex align="center" w={["95vw", "85vw", "70vw", "50vw", "40vw"]} mb={3}>
        <IconButton
          aria-label="Go back"
          variant="link"
          color="white"
          w="15%"
          icon={<ChevronLeftIcon boxSize={8} />}
          onClick={() => handleGoBack()}
        />

        <Heading w="70%" fontSize="xl" textAlign="center">
          Add a new exercise
        </Heading>
        <Box w="16%" />
      </Flex>
      <ExerciseForm
        initialSelectedCategories={[]}
        initialRepsOrTimed="reps"
        onSubmit={onSubmit}
        buttonText="Create"
        serverError={serverError}
      ></ExerciseForm>
    </Container>
  );
};

export default NewExercisePage;
