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
            <Text textColor="white">Full body 1</Text>
          </CardBody>
        </Card>

        <Card bg="#404040">
          <CardBody>
            <Text textColor="white">Full body 2</Text>
          </CardBody>
        </Card>
        <Card bg="#404040">
          <CardBody>
            <Text textColor="white">Upper body</Text>
          </CardBody>
        </Card>
        <Card bg="#404040">
          <CardBody>
            <Text textColor="white">Lower body</Text>
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
