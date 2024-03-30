import { Flex, Text, Card, CardBody } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const Routines = () => {
  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
    >
      <Text fontSize="xl" w="100%" textAlign="center" p={3}>
        Routines
      </Text>
      <Flex direction="column" gap={2} w="100%">
        <Card bg="#404040">
          <CardBody>
            <Flex direction="column" gap={1} textColor="white">
              <Flex direction="column" gap={2}>
                <Text fontWeight="bold">Full Body 1</Text>
                <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                  5 EXERCISES
                </Text>
              </Flex>
              <Text fontSize="sm" color="#E0E0E0">
                Barbell bench press | Barbell squats | Dumbbell lateral raises |
                Pulldowns | Leg internal rotation
              </Text>
            </Flex>
          </CardBody>
        </Card>

        <Card bg="#404040">
          <CardBody>
            <Flex direction="column" gap={1} textColor="white">
              <Flex direction="column" gap={2}>
                <Text fontWeight="bold">Full Body 1</Text>
                <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                  5 EXERCISES
                </Text>
              </Flex>
              <Text fontSize="sm" color="#E0E0E0">
                Barbell bench press | Barbell squats | Dumbbell lateral raises |
                Pulldowns | Leg internal rotation
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <Flex justify="center" align="center" gap={2}>
        <PlusSquareIcon boxSize={6} />
        <Text fontSize="lg">Add Routine</Text>
      </Flex>
    </Flex>
  );
};

export default Routines;
