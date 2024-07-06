import { useLocation } from "react-router-dom";
import CustomCard from "../UI/CustomCard";
import { CardBody, Text, Flex } from "@chakra-ui/react";
import { Exercise } from "../../interfaces/exercise.interface";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  exercise: Exercise;
  exercisesToAddToWorkout: Exercise[];
  setExercisesToAddToWorkout: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const SingleExercise: React.FC<Props> = ({
  exercise,
  exercisesToAddToWorkout,
  setExercisesToAddToWorkout,
}) => {
  const location = useLocation();

  const handleAddExerciseToWorkout = (
    e: React.MouseEvent,
    exercise: Exercise
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!exercisesToAddToWorkout.includes(exercise)) {
      setExercisesToAddToWorkout((prevExercises) => [
        ...prevExercises,
        exercise,
      ]);
    } else {
      setExercisesToAddToWorkout((prevExercises) =>
        prevExercises.filter((ex) => ex.id !== exercise.id)
      );
    }
    console.log(exercisesToAddToWorkout);
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
              onClick={(e) => handleAddExerciseToWorkout(e, exercise)}
            >
              {!exercisesToAddToWorkout.includes(exercise) ? (
                <AddCircleOutlineIcon />
              ) : (
                <Text fontSize="xs" fontWeight="bold">
                  UNDO
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
