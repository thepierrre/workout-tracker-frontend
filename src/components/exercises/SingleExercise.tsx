import {
  Badge,
  CardBody,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import DeletionModal from "../../components/UI/DeletionModal";
import { Exercise } from "../../interfaces/exercise.interface";
import {
  addExInstance,
  removeExInstance,
} from "../../store/workout/workoutSessionsSlice";
import CustomCard from "../UI/CustomCard";

interface Props {
  workoutId: string | null;
  currentWorkoutExercisesNames: string[];
  exercise: Exercise;
  setCurrentWorkoutExercisesNames: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

const SingleExercise: React.FC<Props> = ({
  workoutId,
  currentWorkoutExercisesNames,
  exercise,
  setCurrentWorkoutExercisesNames,
}) => {
  const location = useLocation();
  const [addingExerciseInProgress, setAddingExerciseInProgress] =
    useState<boolean>(false);
  const [deletingExerciseInProgress, setDeletingExerciseInProgress] =
    useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const { workouts } = useSelector((state: RootState) => state.workoutSessions);
  const { exercises } = useSelector((state: RootState) => state.exercises);

  const handleOpenModal = () => {
    onOpen();
  };

  const handleAddOrDeleteExerciseInstance = async (
    e: React.MouseEvent,
    exerciseName: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (workoutId !== null) {
        // Add the exercise to the workout.
        if (!currentWorkoutExercisesNames.includes(exerciseName)) {
          setCurrentWorkoutExercisesNames((prevExercises) => [
            ...prevExercises,
            exerciseName,
          ]);

          const exerciseType = exercises.find((ex) => ex.name === exerciseName);

          if (exerciseType) {
            setAddingExerciseInProgress(true);
            const result = await dispatch(
              addExInstance({ exerciseType, workoutId }),
            );
            unwrapResult(result);
          }
        } else {
          // Open the modal to confirm the deletion of the exercise.
          handleOpenModal();
        }
      }
    } catch (error) {
      console.error("Failed to add the exercise to workout:", error);
    } finally {
      setAddingExerciseInProgress(false);
    }
  };

  const handleRemoveExInstance = async (exerciseName: string) => {
    try {
      const currentWorkout = workouts.find((wrk) => wrk.id === workoutId);
      let exerciseInstance;

      if (currentWorkout) {
        exerciseInstance = currentWorkout.exerciseInstances.find(
          (ex) => ex.exerciseTypeName === exerciseName,
        );
      }

      setCurrentWorkoutExercisesNames((prevExercises) =>
        prevExercises.filter((name) => name !== exerciseName),
      );

      onClose();

      if (exerciseInstance && exerciseInstance.id) {
        const exInstanceId = exerciseInstance.id;
        setDeletingExerciseInProgress(true);
        const result = await dispatch(removeExInstance(exInstanceId));
        unwrapResult(result);
      }
    } catch (error) {
      console.error("Failed to remove the exercise from workout:", error);
    } finally {
      setDeletingExerciseInProgress(false);
    }
  };

  const isExerciseDefault = exercise.isDefault === true;

  return (
    <>
      <CustomCard>
        <CardBody
          borderRadius={5}
          bg={
            location.state &&
            location.state.addExercises === "true" &&
            currentWorkoutExercisesNames?.includes(exercise.name)
              ? "lightblue"
              : "#414141"
          }
        >
          {!isExerciseDefault && (
            <Badge position="absolute" top={4} right={4} bg="#E9D8FD">
              Custom
            </Badge>
          )}
          <Flex>
            <Flex direction="column" gap={1} textColor="white" w="80%">
              <Text
                fontWeight="bold"
                fontSize="lg"
                data-testid={`exercise-name-${exercise.name}`}
                color={
                  location.state &&
                  location.state.addExercises === "true" &&
                  currentWorkoutExercisesNames?.includes(exercise.name)
                    ? "#414141"
                    : "white"
                }
              >
                {exercise.name}
              </Text>
              <Text
                fontSize="sm"
                color={
                  location.state &&
                  location.state.addExercises === "true" &&
                  currentWorkoutExercisesNames?.includes(exercise.name)
                    ? "#414141"
                    : "white"
                }
                data-testid={`exercise-categories-${exercise.id}`}
              >
                {exercise.categories.length > 0
                  ? exercise.categories
                      .map((category) => category?.name)
                      .join(" | ")
                      .toUpperCase()
                  : `0 categories`.toUpperCase()}
              </Text>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color={
                  location.state &&
                  location.state.addExercises === "true" &&
                  currentWorkoutExercisesNames?.includes(exercise.name)
                    ? "#414141"
                    : "lightblue"
                }
              >
                {exercise.equipment}
              </Text>
            </Flex>
            {location.state && location.state.addExercises === "true" && (
              <Flex
                w="20%"
                align="center"
                justify="end"
                mr={2}
                onClick={(e) =>
                  handleAddOrDeleteExerciseInstance(e, exercise.name)
                }
              >
                {!deletingExerciseInProgress && !addingExerciseInProgress ? (
                  !currentWorkoutExercisesNames?.includes(exercise.name) ? (
                    <Text fontSize="xs" fontWeight="bold" color="lightblue">
                      ADD
                    </Text>
                  ) : (
                    <Text fontSize="xs" fontWeight="bold" color="#C53030">
                      REMOVE
                    </Text>
                  )
                ) : (
                  <Spinner
                    color={addingExerciseInProgress ? "#414141" : "lightblue"}
                  />
                )}
              </Flex>
            )}
          </Flex>
        </CardBody>
      </CustomCard>
      <DeletionModal
        deletionInProgress={deletingExerciseInProgress}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={() => handleRemoveExInstance(exercise.name)}
        elementType="exercise"
        text="Delete the exercise from the workout?"
      />
    </>
  );
};

export default SingleExercise;
