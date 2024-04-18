import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { Card, CardBody, Flex, Text, Heading } from "@chakra-ui/react";

const Workout = () => {
  const { routineName, exerciseInstances } = useSelector(
    (state: RootState) => state.currentWorkout
  );

  return (
    <>
      <Heading fontWeight="bold" fontSize="lg" mb={4}>
        {routineName}
      </Heading>
      <Flex direction="column" gap={3} textColor="white">
        <Flex direction="column" gap={3}>
          {exerciseInstances.map((exerciseInstance, index) => (
            <Link to={`/workouts/exercises/${exerciseInstance}`}>
              <Card bg="#404040" w="95vw" direction="column" key={index}>
                <CardBody>
                  <Text color="white" fontWeight="bold" mb={2}>
                    {exerciseInstance.exercise.name}
                  </Text>
                  <Flex color="white" direction="column">
                    {exerciseInstance.series.map((series, index) => (
                      <Flex key={index} gap={10}>
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
                    ))}
                  </Flex>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Workout;
