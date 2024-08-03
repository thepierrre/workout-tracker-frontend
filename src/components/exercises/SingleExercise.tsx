import { Badge, CardBody, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import DeletionModal from "../../components/UI/DeletionModal";
import {
  addExInstance,
  removeExInstance,
} from "../../features/workout/workoutSessionsSlice";
import { Exercise } from "../../interfaces/exercise.interface";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const { workouts } = useSelector((state: RootState) => state.workoutSessions);
  const { exercises } = useSelector((state: RootState) => state.exercises);

  const handleOpenModal = () => {
    onOpen();
  };

  const handleAddOrDeleteExerciseInstance = (
    e: React.MouseEvent,
    exerciseName: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (workoutId !== null) {
      // const currentWorkout = workouts.find((wrk) => wrk.id === workoutId);

      // if (currentWorkout) {

      //   letexerciseInstance = currentWorkout.exerciseInstances.find(
      //     (ex) => ex.exerciseTypeName === exerciseName
      //   );
      // }

      if (!currentWorkoutExercisesNames.includes(exerciseName)) {
        setCurrentWorkoutExercisesNames((prevExercises) => [
          ...prevExercises,
          exerciseName,
        ]);

        const exerciseType = exercises.find((ex) => ex.name === exerciseName);

        if (exerciseType) {
          dispatch(addExInstance({ exerciseType, workoutId }));
        }
      } else {
        handleOpenModal();
      }
    }
  };

  const handleRemoveExInstance = (exerciseName: string) => {
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
    if (exerciseInstance && exerciseInstance.id) {
      let exInstanceId = exerciseInstance.id;
      dispatch(removeExInstance(exInstanceId));
    }

    onClose();
  };

  const isExerciseDefault = exercise.isDefault === true;

  return (
    <>
      <CustomCard>
        <CardBody
          borderRadius={5}
          bg={
            currentWorkoutExercisesNames?.includes(exercise.name)
              ? "lightblue"
              : "#414141"
          }
        >
          {!isExerciseDefault && (
            <Badge position="absolute" top={4} right={4}>
              Custom
            </Badge>
          )}
          <Flex>
            <Flex direction="column" gap={1} textColor="white">
              <Text
                fontWeight="bold"
                fontSize="lg"
                data-testid={`exercise-name-${exercise.id}`}
                color={
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
                mt={3}
                fontSize="sm"
                fontWeight="bold"
                color={
                  currentWorkoutExercisesNames?.includes(exercise.name)
                    ? "#414141"
                    : "lightblue"
                }
              >
                {exercise.equipment}
              </Text>
            </Flex>
            {location.state && location.state.addExercises == "true" && (
              <Flex
                w="100%"
                align="center"
                justify="end"
                mr={2}
                onClick={(e) =>
                  handleAddOrDeleteExerciseInstance(e, exercise.name)
                }
              >
                {!currentWorkoutExercisesNames?.includes(exercise.name) ? (
                  <Text fontSize="xs" fontWeight="bold" color="lightblue">
                    ADD
                  </Text>
                ) : (
                  <Text fontSize="xs" fontWeight="bold" color="#C53030">
                    REMOVE
                  </Text>
                )}
              </Flex>
            )}
          </Flex>
        </CardBody>
      </CustomCard>
      <DeletionModal
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
