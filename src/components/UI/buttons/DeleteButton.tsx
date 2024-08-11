import { Flex, Text } from "@chakra-ui/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Workout } from "interfaces/workout.interface";

import { Exercise } from "../../../interfaces/exercise.interface";
import { Routine } from "../../../interfaces/routine.interface";

// Custom button for deleting a routine, exercise or workout.

interface Props {
  color?: string;
  text?: string;
  onOpen: () => void;
  currentRoutine?: Routine;
  currentExercise?: Exercise;
  currentWorkout?: Workout;
  setExerciseToDelete?: React.Dispatch<React.SetStateAction<Exercise | null>>;
  setRoutineToDelete?: React.Dispatch<React.SetStateAction<Routine | null>>;
  setWorkoutToDelete?: React.Dispatch<React.SetStateAction<Workout | null>>;
}

const DeleteButton: React.FC<Props> = ({
  color,
  text,
  onOpen,
  currentRoutine,
  currentExercise,
  currentWorkout,
  setExerciseToDelete,
  setRoutineToDelete,
  setWorkoutToDelete,
}) => {
  const handleOpenRoutineModal = (routine: Routine) => {
    if (setRoutineToDelete) {
      setRoutineToDelete(routine);
    }
    onOpen();
  };

  const handleOpenExerciseModal = (exercise: Exercise) => {
    if (setExerciseToDelete) {
      setExerciseToDelete(exercise);
    }
    onOpen();
  };

  const handleOpenWorkoutModal = (workout: Workout) => {
    if (setWorkoutToDelete) {
      setWorkoutToDelete(workout);
    }
    onOpen();
  };

  const handleClick = () => {
    if (currentRoutine) {
      handleOpenRoutineModal(currentRoutine);
    } else if (currentExercise) {
      handleOpenExerciseModal(currentExercise);
    } else if (currentWorkout) {
      handleOpenWorkoutModal(currentWorkout);
    }
  };

  return (
    <Flex
      gap={1}
      m={[0, 0, 3, 0]}
      justify="center"
      onClick={handleClick}
      color={color || "white"}
    >
      <RemoveCircleOutlineIcon />
      <Text fontWeight="bold">{text || "DELETE"}</Text>
    </Flex>
  );
};

export default DeleteButton;
