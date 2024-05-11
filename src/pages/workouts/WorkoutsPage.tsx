import Datepicker from "../../components/workouts/Datepicker";
import NewWorkout from "../../components/workouts/NewWorkout";
import WorkoutSession from "../../components/workouts/WorkoutSession";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Container from "../../components/UI/Container";

import { Text } from "@chakra-ui/react";

export const WorkoutsPage = () => {
  const workouts = useSelector(
    (state: RootState) => state.workoutSessions.workouts
  );

  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);

  const filteredWorkouts = workouts.filter(
    (wrk) => format(wrk.creationDate, "dd/MM/yyyy") === chosenDay
  );

  return (
    <Container>
      <Datepicker />
      <NewWorkout />
      {filteredWorkouts?.length > 0 ? (
        filteredWorkouts.map((workout) => (
          <WorkoutSession key={workout.id} workout={workout} />
        ))
      ) : (
        <Text textColor="white" mt={5}>
          No workouts for this day.
        </Text>
      )}
    </Container>
  );
};

export default WorkoutsPage;
