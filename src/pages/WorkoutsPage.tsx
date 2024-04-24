import Datepicker from "../components/workouts/Datepicker";
import NewWorkout from "../components/workouts/NewWorkout";
import WorkoutSession from "../components/workouts/WorkoutSession";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { Flex, Text } from "@chakra-ui/react";

const WorkoutsPage = () => {
  const workouts = useSelector(
    (state: RootState) => state.workoutSessions.workouts
  );

  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);

  const filteredWorkouts = workouts.filter(
    (wrk) => format(wrk.creationDate, "dd/MM/yyyy") === chosenDay
  );

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
      {filteredWorkouts?.length > 0 ? (
        filteredWorkouts.map((workout) => (
          <WorkoutSession key={workout.id} workout={workout} />
        ))
      ) : (
        <Text textColor="white">No workouts for this day.</Text>
      )}
    </Flex>
  );
};

export default WorkoutsPage;
