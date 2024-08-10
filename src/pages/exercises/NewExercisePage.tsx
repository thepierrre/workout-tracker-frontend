import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import MainHeading from "../../components/UI/text/MainHeading";
import ExerciseForm, {
  FormValues,
} from "../../components/forms/exerciseForm/ExerciseForm";
import { Category } from "../../interfaces/category.interface";
import { fetchCategories } from "../../store/exercises/categoriesSlice";
import { addExercise } from "../../store/exercises/exercisesSlice";

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

  if (categoriesState.loading) {
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
          <Link to="/exercises">
            <Text fontWeight="bold" color="#FC8181">
              CANCEL
            </Text>
          </Link>
        </Box>

        <MainHeading text="New exercise" />

        <Box
          position="absolute"
          top="4.7rem"
          right="2rem"
          onClick={() => exerciseFormRef.current?.submit()}
        >
          <Text fontWeight="bold" color="#48BB78">
            CREATE
          </Text>
        </Box>
      </Flex>
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
