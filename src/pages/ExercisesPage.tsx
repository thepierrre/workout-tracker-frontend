import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import NewExercise from "../components/exercises/NewExercise";

import { Flex, Text, Card, CardBody } from "@chakra-ui/react";

const ExercisesPage = () => {
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

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
          <Link key={exercise.id} to={`/exercises/exercise`}>
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
          </Link>
        ))}
      </Flex>
      <NewExercise />
    </Flex>
  );
};

export default ExercisesPage;
