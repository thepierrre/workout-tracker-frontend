import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  Flex,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Box,
} from "@chakra-ui/react";
import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";

const ExerciseInstancePage = () => {
  const { exerciseInstanceId } = useParams();

  const workoutSessions = useSelector(
    (state: RootState) => state.workoutSessions
  );

  let exerciseInstance: ExerciseInstance | undefined;

  for (const workout of workoutSessions.workouts) {
    exerciseInstance = workout.exerciseInstances.find(
      (instance) => instance.id === exerciseInstanceId
    );
    if (exerciseInstance) {
      break; // Break loop if the exercise instance is found
    }
  }

  // const exerciseInstance: ExerciseInstance | undefined =
  //   workoutSessions.workouts
  //     .flatMap((workout) => workout.exerciseInstances)
  //     .find((instance) => instance.id === exerciseInstanceId);

  // console.log(workoutSessions.workouts[0].exerciseInstances[0].exercise.name);

  return (
    <Flex direction="column" w="100vw" mt={5} p={2} color="white">
      {exerciseInstance?.exercise !== undefined && (
        <Flex direction="column" gap={5}>
          <Heading fontSize="md" color="white" textAlign="center">
            {exerciseInstance?.exercise.name.toUpperCase()}
          </Heading>
          <Flex w="100%" direction="column" gap={5} mt={2}>
            <Flex>
              <Flex direction="column" w="50%" gap={1}>
                <Text textAlign="center" fontSize="sm">
                  REPS
                </Text>
                <Flex justify="center" gap={3} align="center">
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <Text fontSize="3xl">–</Text>
                  </Flex>
                  <Text fontSize="3xl">10</Text>
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <Text fontSize="3xl">+</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" w="50%" gap={1}>
                <Text textAlign="center" fontSize="sm">
                  KGS
                </Text>
                <Flex justify="center" gap={3} align="center">
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <Text fontSize="3xl">–</Text>
                  </Flex>
                  <Text fontSize="3xl">40</Text>
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <Text fontSize="3xl">+</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex justify="center" gap={5}>
              <Button w={24} bg="lightblue" textColor="#353935">
                ADD
              </Button>
              <Button w={24} bg="lightblue" textColor="#353935">
                DELETE
              </Button>
            </Flex>
          </Flex>
          <Flex direction="column" gap={2} mt={3}>
            {exerciseInstance?.series.map((series, index) => (
              <Card bg="#404040" w="95vw" key={index}>
                <CardBody p={4}>
                  <Flex key={index} gap={10} color="white">
                    <Text flex={0.1}>{index + 1}</Text>
                    <Flex gap={3} flex={0.2}>
                      <Text fontWeight="bold">{series.reps}</Text>
                      <Text>reps</Text>
                    </Flex>
                    <Flex gap={3} flex={0.2}>
                      <Text fontWeight="bold">{series.weight}</Text>
                      <Text>kgs</Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ExerciseInstancePage;
