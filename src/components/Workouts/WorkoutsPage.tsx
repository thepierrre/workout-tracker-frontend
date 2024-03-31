import Datepicker from "./Datepicker";
import NewWorkout from "./NewWorkout";
import Workout from "./Workout";

import { Flex, Text } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const WorkoutsPage = () => {
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
      <NewWorkout />
      <Workout />
    </Flex>
  );
};

export default WorkoutsPage;
