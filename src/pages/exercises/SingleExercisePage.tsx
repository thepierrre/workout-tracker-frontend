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
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "underscore";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import DeletionModal from "../../components/UI/DeletionModal";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import ExerciseForm, { FormValues } from "../../components/forms/ExerciseForm";
import { fetchCategories } from "../../features/exercises/categoriesSlice";
import { removeExercise } from "../../features/exercises/exercisesSlice";
import { updateExercise } from "../../features/exercises/exercisesSlice";
import { Category } from "../../interfaces/category.interface";
import { Exercise } from "../../interfaces/exercise.interface";

const SingleExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser,
  );
  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises,
  );
  const { exerciseId } = useParams();

  const currentExercise = exercises.find(
    (exercise) => exercise.id === exerciseId,
  );

  useEffect(() => {
    dispatch(fetchCategories());
    console.log(currentExercise);
  }, [dispatch]);

  if (!user) {
    return;
  }

  if (!currentExercise) {
    return <Text>Exercise not found.</Text>;
  }

  const onSubmit = async (
    data: { name: string },
    selectedCategories: Category[],
    repsOrTimed: string,
    setError: UseFormSetError<FormValues>,
  ) => {
    const currentIndex = exercises.indexOf(currentExercise);

    const exerciseToUpdate = {
      id: currentExercise.id,
      name: data.name,
      categories: selectedCategories,
      repsOrTimed,
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
    }
  };

  const handleOpenModal = (exercise: Exercise) => {
    setExerciseToDelete(exercise);
    onOpen();
  };

  const handleRemoveExercise = async () => {
    if (exerciseToDelete) {
      await dispatch(removeExercise(exerciseToDelete.id));
      setExerciseToDelete(null);
      onClose();
      navigate("/exercises", { state: { exercise: "removed" } });
    }
  };

  const exerciseFormRef = useRef<{ submit: () => void }>(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loadingUser || loadingExercises) {
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

        <Heading
          w="100%"
          fontSize="2xl"
          textAlign="center"
          color="white"
          mb={5}
        >
          Edit exercise
        </Heading>

        <Box
          position="absolute"
          top="4.7rem"
          right="3.5rem"
          onClick={() => exerciseFormRef.current?.submit()}
        >
          <Text fontWeight="bold" color="#48BB78">
            SAVE
          </Text>
        </Box>
      </Flex>
      <ExerciseForm
        ref={exerciseFormRef}
        initialName={currentExercise.name}
        initialRepsOrTimed={currentExercise.repsOrTimed}
        initialSelectedCategories={currentExercise.categories}
        buttonText="Update"
        onSubmit={onSubmit}
        serverError={serverError}
      ></ExerciseForm>
      <Flex
        gap={1}
        justify="center"
        color="lightblue"
        onClick={() => handleOpenModal(currentExercise)}
        mt={3}
      >
        <RemoveCircleOutlineIcon />
        <Text fontWeight="bold">Delete exercise</Text>
        <DeletionModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleRemoveExercise}
          elementType="exercise"
        />
      </Flex>
    </Container>
  );
};

export default SingleExercisePage;
