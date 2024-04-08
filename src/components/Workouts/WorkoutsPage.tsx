import Datepicker from "./Datepicker";
import NewWorkout from "./NewWorkout";
import Workout from "./Workout";

import { Flex } from "@chakra-ui/react";

const WorkoutsPage = () => {
  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      p={2}
      mt={8}
    >
      <Datepicker />
      <NewWorkout />
      <Workout />
    </Flex>
  );
};

export default WorkoutsPage;
