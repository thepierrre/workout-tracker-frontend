import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import { Series } from "../../interfaces/series.interface";

const ExerciseInstancePage = () => {
  const [reps, setReps] = useState<number>(9);
  const [weight, setWeight] = useState<number>(42);
  const [activeSeries, setActiveSeries] = useState<Series | undefined>(
    undefined
  );

  const { exerciseInstanceId } = useParams();

  const { state } = useLocation();
  const wrk = state.workout;

  const workoutSessions = useSelector(
    (state: RootState) => state.workoutSessions
  );

  console.log(wrk);

  let exerciseInstance: ExerciseInstance | undefined;

  for (const workout of workoutSessions.workouts) {
    exerciseInstance = workout.exerciseInstances.find(
      (instance) => instance.id === exerciseInstanceId
    );
    if (exerciseInstance) {
      break;
    }
  }

  const handleModify = (type: string, action: string) => {
    if (type === "reps") {
      if (action === "increase") {
        setReps(reps + 1);
      } else if (action === "decrease") {
        setReps(reps - 1);
      }
    } else if (type === "weight") {
      if (action === "increase") {
        setWeight(weight + 1);
      } else if (action === "decrease") {
        setWeight(weight - 1);
      }
    }
  };

  const handleActiveExInstance = (series: Series) => {
    setActiveSeries(series);
    console.log(activeSeries);
  };

  return (
    <Flex direction="column" w="100vw" mt={5} p={2} textColor="white">
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
                  <Button
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    fontSize="3xl"
                    onClick={() => handleModify("reps", "decrease")}
                  >
                    –
                  </Button>
                  <Text fontSize="3xl">{reps}</Text>
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <Button
                      bg="#404040"
                      w={10}
                      h={10}
                      borderRadius={8}
                      fontSize="3xl"
                      onClick={() => handleModify("reps", "increase")}
                    >
                      +
                    </Button>
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
                    <Button
                      bg="#404040"
                      w={10}
                      h={10}
                      borderRadius={8}
                      fontSize="3xl"
                      onClick={() => handleModify("weight", "decrease")}
                    >
                      –
                    </Button>
                  </Flex>
                  <Text fontSize="3xl">{weight}</Text>
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <Button
                      bg="#404040"
                      w={10}
                      h={10}
                      borderRadius={8}
                      fontSize="3xl"
                      onClick={() => handleModify("weight", "increase")}
                    >
                      +
                    </Button>
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
              <Card
                // bg="#404040"
                bg={
                  activeSeries && activeSeries.id === series.id
                    ? "lightblue"
                    : "#404040"
                }
                w="95vw"
                key={index}
                onClick={() => series && handleActiveExInstance(series)}
              >
                <CardBody p={4}>
                  <Flex
                    key={index}
                    gap={10}
                    color={
                      activeSeries && activeSeries.id === series.id
                        ? "#353935"
                        : "white"
                    }
                  >
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
