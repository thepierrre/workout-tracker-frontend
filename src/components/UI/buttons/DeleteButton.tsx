import { Flex, Text } from "@chakra-ui/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { Exercise } from "../../../interfaces/exercise.interface";
import { Routine } from "../../../interfaces/routine.interface";

// Custom button for deleting a routine or exercise.

interface Props {
  onOpen: () => void;
  currentRoutine?: Routine;
  currentExercise?: Exercise;
  setExerciseToDelete?: React.Dispatch<React.SetStateAction<Exercise | null>>;
  setRoutineToDelete?: React.Dispatch<React.SetStateAction<Routine | null>>;
}

const DeleteButton: React.FC<Props> = ({
  onOpen,
  currentRoutine,
  currentExercise,
  setExerciseToDelete,
  setRoutineToDelete,
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

  const handleClick = () => {
    if (currentRoutine) {
      handleOpenRoutineModal(currentRoutine);
    } else if (currentExercise) {
      handleOpenExerciseModal(currentExercise);
    }
  };

  return (
    <Flex gap={1} mb={5} justify="center" onClick={handleClick}>
      <RemoveCircleOutlineIcon />
      <Text fontWeight="bold">DELETE</Text>
    </Flex>
  );
};

export default DeleteButton;
