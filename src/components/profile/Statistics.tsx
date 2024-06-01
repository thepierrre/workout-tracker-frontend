import { Flex, Heading, Card, Text } from "@chakra-ui/react";
import { Workout } from "../../interfaces/workout.interface";
import { Routine } from "../../interfaces/routine.interface";
import { Exercise } from "../../interfaces/exercise.interface";
import React from "react";

interface Props {
  workouts: Workout[];
  routines: Routine[];
  exercises: Exercise[];
}

const Statistics: React.FC<Props> = ({ workouts, routines, exercises }) => {
  return (
    <Flex direction="column" align="center" gap={2} mb={3}>
      <Heading fontSize="lg" mb={1}>
        Statistics
      </Heading>
      <Card bg="#404040" color="white" padding={4} w="95vw" gap={2}>
        <Flex gap={2}>
          <Text fontWeight="bold">Workouts:</Text>
          <Text>{workouts.length}</Text>
        </Flex>
      </Card>
      <Card bg="#404040" color="white" padding={4} w="95vw" gap={2}>
        <Flex gap={2}>
          <Text fontWeight="bold">Routines:</Text>
          <Text>{routines.length}</Text>
        </Flex>
      </Card>
      <Card bg="#404040" color="white" padding={4} w="95vw" gap={2}>
        <Flex gap={2}>
          <Text fontWeight="bold">Exercises:</Text>
          <Text>{exercises.length}</Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Statistics;
