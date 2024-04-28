import { Card, CardBody, Text, Flex } from "@chakra-ui/react";

const WorkoutExerciseCard = () => {
  return (
    <>
      <Card bg="#404040" w="95vw">
        <CardBody>
          <Flex direction="column" gap={3} textColor="white">
            <Text fontWeight="bold">Barbell press</Text>
            <Flex direction="column" gap={3}>
              <Flex gap={10}>
                <Text fontWeight="bold">1</Text>
                <Flex gap={1}>
                  <Text fontWeight="bold">10</Text>
                  <Text textColor="#C2C2C2">reps</Text>
                </Flex>
                <Flex gap={1}>
                  <Text fontWeight="bold">35</Text>
                  <Text textColor="#C2C2C2">kgs</Text>
                </Flex>
              </Flex>
              <Flex gap={10}>
                <Text fontWeight="bold">2</Text>
                <Flex gap={1}>
                  <Text fontWeight="bold">10</Text>
                  <Text textColor="#C2C2C2">reps</Text>
                </Flex>
                <Flex gap={1}>
                  <Text fontWeight="bold">35</Text>
                  <Text textColor="#C2C2C2">kgs</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default WorkoutExerciseCard;
