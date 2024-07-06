import { useLocation } from "react-router-dom";
import CustomCard from "../UI/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { CardBody, Text, Flex } from "@chakra-ui/react";
import { Exercise } from "../../interfaces/exercise.interface";
import {
  addExInstance,
  removeExInstance,
} from "../../features/workout/workoutSessionsSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  workoutId: string | null;
  currentWorkoutExercisesNames: string[];
  exercise: Exercise;
  // exercisesToAddToWorkout: Exercise[];
  setCurrentWorkoutExercisesNames: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

const SingleExercise: React.FC<Props> = ({
  workoutId,
  currentWorkoutExercisesNames,
  exercise,
  // exercisesToAddToWorkout,
  setCurrentWorkoutExercisesNames,
}) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { workouts } = useSelector((state: RootState) => state.workoutSessions);
  const { exercises } = useSelector((state: RootState) => state.exercises);

  // const currentWorkout = workouts.find((wrk) => wrk.id === workoutId);
  // let currentWorkoutExercisesTypesNames = [];

  // if (currentWorkout) {
  //   for (const ex of currentWorkout.exerciseInstances) {
  //     console.log(ex.exerciseTypeName);
  //   }
  // }

  const handleAddExerciseToWorkout = (
    e: React.MouseEvent,
    exerciseName: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (workoutId !== null) {
      const currentWorkout = workouts.find((wrk) => wrk.id === workoutId);
      let exerciseInstance;

      if (currentWorkout) {
        exerciseInstance = currentWorkout.exerciseInstances.find(
          (ex) => ex.exerciseTypeName === exerciseName
        );
      }

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
        setCurrentWorkoutExercisesNames((prevExercises) =>
          prevExercises.filter((name) => name !== exerciseName)
        );
        if (exerciseInstance && exerciseInstance.id) {
          let exInstanceId = exerciseInstance.id;
          dispatch(removeExInstance(exInstanceId));
        }
      }
    }

    // console.log(currentWorkoutExercisesNames);
  };

  return (
    <CustomCard>
      <CardBody>
        <Flex>
          <Flex direction="column" gap={1} textColor="white" w="80%">
            <Text
              fontWeight="bold"
              data-testid={`exercise-name-${exercise.id}`}
            >
              {exercise.name}
            </Text>
            <Text
              fontWeight="bold"
              fontSize="xs"
              color="#E0E0E0"
              data-testid={`exercise-categories-${exercise.id}`}
            >
              {exercise.categories.length > 0
                ? exercise.categories
                    .map((category) => category?.name)
                    .join(" | ")
                    .toUpperCase()
                : `0 categories`.toUpperCase()}
            </Text>
          </Flex>
          {location.state && location.state.addExercises == "true" && (
            <Flex
              w="20%"
              align="center"
              justify="end"
              mr={2}
              color="lightblue"
              onClick={(e) => handleAddExerciseToWorkout(e, exercise.name)}
            >
              {!currentWorkoutExercisesNames?.includes(exercise.name) ? (
                <AddCircleOutlineIcon />
              ) : (
                <Text fontSize="xs" fontWeight="bold">
                  REMOVE
                </Text>
              )}
            </Flex>
          )}
        </Flex>
      </CardBody>
    </CustomCard>
  );
};

export default SingleExercise;
