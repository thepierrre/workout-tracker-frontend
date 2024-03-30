import Datepicker from "./Datepicker";
import { Flex, Text } from "@chakra-ui/react";

const Workout = () => {
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
        Workouts
      </Text>
      <Datepicker />
      <Text fontSize="2xl">Add workout</Text>
    </Flex>
  );
};

export default Workout;
