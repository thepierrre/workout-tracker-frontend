import { Flex, Text } from "@chakra-ui/react";

const Exercises = () => {
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
        Exercises
      </Text>
    </Flex>
  );
};

export default Exercises;
