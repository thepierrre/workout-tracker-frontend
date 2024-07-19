import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import _ from "underscore";
import { Category } from "../../interfaces/category.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchExercises,
  removeExercise,
} from "../../features/exercises/exercisesSlice";
import {
  Text,
  Flex,
  Heading,
  IconButton,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { updateExercise } from "../../features/exercises/exercisesSlice";
import ExerciseForm from "../../components/forms/ExerciseForm";
import Container from "../../components/UI/Container";
import DeletionModal from "../../components/UI/DeletionModal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Exercise } from "../../interfaces/exercise.interface";
import { fetchCategories } from "../../features/exercises/categoriesSlice";
import { UseFormSetError } from "react-hook-form";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const SingleExercisePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loading: loadingUser } = useSelector(
    (state: RootState) => state.authenticatedUser
  );
  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises
  );
  const { exerciseId } = useParams();

  const currentExercise = exercises.find(
    (exercise) => exercise.id === exerciseId
  );

  useEffect(() => {
    dispatch(fetchCategories());
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
    setError: UseFormSetError<{ name: string }>
  ) => {
    const currentIndex = exercises.indexOf(currentExercise);

    const exerciseToUpdate = {
      id: currentExercise.id,
      name: data.name,
      categories: selectedCategories,
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

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loadingUser || loadingExercises) {
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

        <Heading w="70%" fontSize="lg" textAlign="center">
          Edit exercise
        </Heading>
        <Box w="16%" />
      </Flex>
      <ExerciseForm
        initialName={currentExercise.name}
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
