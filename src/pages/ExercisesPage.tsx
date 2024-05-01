import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import { Flex, Text, Card, CardBody, Button } from "@chakra-ui/react";

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
      gap={5}
      padding={2}
      marginTop={8}
    >
      <Link to="/exercises/new-exercise">
        <Button w="95vw" bg="lightblue" textColor="#353935" type="submit">
          New exercise
        </Button>
      </Link>
      <Flex direction="column" gap={2} w="100%">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Link key={exercise.id} to={`/exercises/${exercise.id}`}>
              <Card key={index} bg="#404040">
                <CardBody>
                  <Flex direction="column" gap={1} textColor="white">
                    <Flex direction="column" gap={1}>
                      <Text fontWeight="bold">{exercise.name}</Text>
                      <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                        {exercise.categories
                          .map((category) => category.name)
                          .join(" | ")
                          .toUpperCase()}
                      </Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </Link>
          ))
        ) : (
          <Text textAlign="center">You don't have any exercises yet.</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ExercisesPage;
