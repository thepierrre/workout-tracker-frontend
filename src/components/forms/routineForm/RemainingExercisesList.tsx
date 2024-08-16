import { Card, Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";

import useCustomToast from "../../../hooks/useCustomToast";
import { Exercise } from "../../../interfaces/exercise.interface";

interface Props {
  selectedExercises: Exercise[];
  remainingExercises: Exercise[];
  handleCheck: (exercise: Exercise) => void;
  highlightMatchedText: (exerciseName: string) => JSX.Element;
  isExerciseSelected: (exercise: Exercise) => boolean;
  isCheckboxDisabled: (exercise: Exercise) => boolean;
}

const RemainingExercisesList: React.FC<Props> = ({
  selectedExercises,
  remainingExercises,
  handleCheck,
  highlightMatchedText,
  isExerciseSelected,
  isCheckboxDisabled,
}) => {
  const { addToast } = useCustomToast();

  const handleToast = (isExerciseSelected: boolean) => {
    if (!isExerciseSelected && selectedExercises.length >= 15) {
      addToast({
        message: "You can add up to 15 exercises per routine!",
        bg: "#F56565",
      });
    }
  };

  return remainingExercises.length ? (
    <Flex direction="column" gap={2} mt={5} mb={2}>
      {remainingExercises.map((exercise) => (
        <Flex
          key={exercise.id}
          onClick={() => handleToast(isExerciseSelected(exercise))}
          m={0}
        >
          <Card
            bg="#404040"
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            borderRadius={5}
            p={[6, 2, 6, 2]}
            color="white"
          >
            <Checkbox
              isChecked={isExerciseSelected(exercise)}
              isDisabled={isCheckboxDisabled(exercise)}
              onChange={() => handleCheck(exercise)}
              data-testid="not selected checkbox"
              fontWeight="bold"
              fontSize="md"
            >
              {highlightMatchedText(exercise.name)}
            </Checkbox>
            <Text fontWeight="bold" fontSize="xs" mt={2} ml={6}>
              {exercise.categories.length > 0
                ? exercise.categories
                    .map((category) => category?.name)
                    .join(" | ")
                    .toUpperCase()
                : `0 categories`.toUpperCase()}
            </Text>
          </Card>
        </Flex>
      ))}
    </Flex>
  ) : (
    <Flex direction="column">
      <Text textAlign="center" mt={0} mb={2}>
        No exercises.
      </Text>
    </Flex>
  );
};

export default RemainingExercisesList;
