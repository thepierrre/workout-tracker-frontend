import NewExercise from "./NewExercise";

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
        <Card bg="#404040">
          <CardBody>
            <Flex direction="column" gap={1} textColor="white">
              <Flex direction="column" gap={1}>
                <Text fontWeight="bold">Barbell bench press</Text>
                <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                  UPPER BODY | CHEST
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        <Card bg="#404040">
          <CardBody>
            <Flex direction="column" gap={1} textColor="white">
              <Flex direction="column" gap={1}>
                <Text fontWeight="bold">Dumbbell lateral raise</Text>
                <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                  UPPER BODY | SHOULDERS
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        <Card bg="#404040">
          <CardBody>
            <Flex direction="column" gap={1} textColor="white">
              <Flex direction="column" gap={1}>
                <Text fontWeight="bold">Deadlifts</Text>
                <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                  LOWER BODY
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        <Card bg="#404040">
          <CardBody>
            <Flex direction="column" gap={1} textColor="white">
              <Flex direction="column" gap={1}>
                <Text fontWeight="bold">Barbell squats</Text>
                <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                  LOWER BODY
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <NewExercise />
    </Flex>
  );
};

export default ExercisesPage;
