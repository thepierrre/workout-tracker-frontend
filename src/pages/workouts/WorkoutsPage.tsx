import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/exercises/categoriesSlice";
import Datepicker from "../../components/workouts/Datepicker";
import NewWorkout from "../../components/workouts/NewWorkout";
import WorkoutSession from "../../components/workouts/WorkoutSession";
import { RootState, AppDispatch } from "../../app/store";
import { format } from "date-fns";
import Container from "../../components/UI/Container";

import { Text } from "@chakra-ui/react";

export const WorkoutsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workouts = useSelector(
    (state: RootState) => state.workoutSessions.workouts
  );

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);

  const filteredWorkouts = workouts.filter(
    (wrk) => format(wrk.creationDate, "dd/MM/yyyy") === chosenDay
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/users");
  //       console.log(response.data);
  //     } catch {
  //       // empty on purpose
  //     }
  //   };
  //   getUsers();
  // }, []);

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
