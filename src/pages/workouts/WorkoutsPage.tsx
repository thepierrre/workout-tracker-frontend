import { Box, Text, ToastId, useToast } from "@chakra-ui/react";
import { format, isValid, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import Datepicker from "../../components/workouts/Datepicker";
import NewWorkout from "../../components/workouts/NewWorkout";
import WorkoutSession from "../../components/workouts/WorkoutSession";
import { Workout } from "../../interfaces/workout.interface";
import {
  fetchWorkouts,
  removeWorkout,
} from "../../store/workout/workoutSessionsSlice";

export const WorkoutsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const { workouts } = useSelector((state: RootState) => state.workoutSessions);
  const [localWorkouts, setLocalWorkouts] = useState(workouts);
  const [workoutDeletionInProgressId, setWorkingDeletionInProgressId] =
    useState<string | null>(null);
  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    setLocalWorkouts(workouts);
  }, [workouts]);

  const filteredWorkouts = localWorkouts?.filter((wrk: Workout) => {
    if (!wrk.creationDate) {
      console.warn(`Missing date: ${wrk.id}`);
      return false;
    }

    let creationDate = parseISO(wrk.creationDate);

    if (!isValid(creationDate)) {
      console.warn(`Invalid date: ${wrk.creationDate}`);
      return false;
    }

    return format(creationDate, "dd/MM/yyyy") === chosenDay;
  });

  const addToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast({
      position: "bottom",
      duration: 2500,
      render: () => (
        <Box
          color="white"
          bg="#2F855A"
          borderRadius={10}
          p={3}
          fontSize="lg"
          mb={10}
        >
          <Text textAlign="center">Workout deleted</Text>
        </Box>
      ),
    });
  };

  const handleRemoveWorkout = async (id: string) => {
    try {
      setWorkingDeletionInProgressId(id);
      await dispatch(removeWorkout(id)).unwrap();
      setLocalWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.id !== id),
      );
      addToast();
    } catch (error) {
      console.error("Failed to delete workout:", error);
    } finally {
      setWorkingDeletionInProgressId(null);
    }
  };

  return (
    <Container>
      <Datepicker />
      <NewWorkout />
      {filteredWorkouts?.length > 0 ? (
        filteredWorkouts.map((workout) => (
          <WorkoutSession
            key={workout.id}
            workout={workout}
            onRemoveWorkout={handleRemoveWorkout}
            workoutDeletionInProgress={
              workoutDeletionInProgressId === workout.id
            }
          />
        ))
      ) : (
        <Text textColor="white" mt={5}>
          You don't have any workouts for this day.
        </Text>
      )}
    </Container>
  );
};

export default WorkoutsPage;
