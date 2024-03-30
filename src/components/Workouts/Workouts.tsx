import Datepicker from "./Datepicker";
import NewWorkout from "./NewWorkout";
import { Flex, Text } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const Workout = () => {
  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
      marginTop={8}
    >
      <Datepicker />
      {/* <Flex justify="center" align="center" gap={2}> */}
      {/* <PlusSquareIcon boxSize={6} /> */}
      {/* <Text fontSize="lg">Add Workout</Text> */}
      {/* </Flex> */}
      <NewWorkout />
    </Flex>
  );
};

export default Workout;
