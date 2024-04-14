import NewExercise from "../components/exercises/NewExercise";

import { exercises } from "../util/DUMMY_DATA";

import { Flex, Text, Card, CardBody } from "@chakra-ui/react";

const ExercisesPage = () => {
  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={8}
      padding={2}
      marginTop={8}
    >
      <Flex direction="column" gap={2} w="100%">
        {exercises.map((exercise, index) => (
          <Card key={index} bg="#404040">
            <CardBody>
              <Flex direction="column" gap={1} textColor="white">
                <Flex direction="column" gap={1}>
                  <Text fontWeight="bold">{exercise.name}</Text>
                  <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                    {exercise.categories.join(" | ").toUpperCase()}
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Flex>
      <NewExercise />
    </Flex>
  );
};

export default ExercisesPage;
