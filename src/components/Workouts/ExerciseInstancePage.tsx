import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Flex, Text } from "@chakra-ui/react";

const ExerciseInstancePage = () => {
  const exerciseId = useParams();

  const exerciseInstances = useSelector(
    (state: RootState) => state.currentWorkout.exerciseInstances
  );
  // const exerciseInstance = exerciseInstances[exerciseId];

  return (
    <Flex direction="column" w="100vw" mt={8} p={2}>
      <Text textColor="white">abc</Text>
      <Text textColor="white">abc</Text>
      <Text textColor="white">abc</Text>
    </Flex>
  );
};

export default ExerciseInstancePage;
