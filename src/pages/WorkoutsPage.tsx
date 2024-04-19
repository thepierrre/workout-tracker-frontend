import Datepicker from "../components/workouts/Datepicker";
import NewWorkout from "../components/workouts/NewWorkout";
import WorkoutSession from "../components/workouts/WorkoutSession";

import { workouts } from "../util/DUMMY_DATA";

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
      {workouts.map((workout) => (
        <WorkoutSession key={workout.id} workout={workout} />
      ))}
    </Flex>
  );
};

export default WorkoutsPage;
