import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Workout } from "../../interfaces/workout.interface";
import { useDispatch } from "react-redux";
import { removeWorkout } from "../../features/workout/workoutSessionsSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import WorkoutExerciseInstance from "./WorkoutExerciseInstance";

import { Flex, Text, Heading } from "@chakra-ui/react";
import { AppDispatch } from "../../app/store";

interface WorkoutProps {
  workout: Workout;
}

const WorkoutSession: React.FC<WorkoutProps> = ({ workout: wrk }) => {
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   console.log(wrk.exerciseInstances);
  // });

  const handleRemoveWorkout = (workout: Workout) => {
    dispatch(removeWorkout(workout.id));
  };

  return (
    <Flex direction="column" m={2}>
      <Heading fontWeight="bold" fontSize="lg" textAlign="center" m={3}>
        {wrk.routineName}
      </Heading>
      <Flex direction="column" gap={3} textColor="white">
        <Flex direction="column" gap={3}>
          {wrk.exerciseInstances.map((exerciseInstance, index) => (
            <Link
              key={exerciseInstance.id}
              to={`/workouts/${wrk.id}/exercise-instances/${exerciseInstance.id}`}
            >
              <WorkoutExerciseInstance
                key={index}
                exerciseInstance={exerciseInstance}
              />
            </Link>
          ))}
        </Flex>
        <Flex
          gap={1}
          justify="center"
          color="lightblue"
          onClick={() => handleRemoveWorkout(wrk)}
        >
          <RemoveCircleOutlineIcon />
          <Text fontWeight="bold">Remove workout</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorkoutSession;
