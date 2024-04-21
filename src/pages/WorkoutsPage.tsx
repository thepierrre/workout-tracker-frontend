import Datepicker from "../components/workouts/Datepicker";
import NewWorkout from "../components/workouts/NewWorkout";
import WorkoutSession from "../components/workouts/WorkoutSession";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";

// import { workouts } from "../util/DUMMY_DATA";

import { Flex } from "@chakra-ui/react";

const WorkoutsPage = () => {
  const workouts = useSelector(
    (state: RootState) => state.workoutSessions.workouts
  );

  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);

  // console.log(workouts[0].creationDate);
  // console.log(chosenDay);

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
