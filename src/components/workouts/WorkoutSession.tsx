import { Link } from "react-router-dom";
import { Workout } from "../../interfaces/workout.interface";
import { useDispatch } from "react-redux";
import { removeWorkout } from "../../features/workout/workoutSessionsSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { Card, CardBody, Flex, Text, Heading } from "@chakra-ui/react";

interface WorkoutProps {
  workout: Workout;
}

const WorkoutSession: React.FC<WorkoutProps> = ({ workout: wrk }) => {
  const dispatch = useDispatch();

  const handleRemoveWorkout = (workout: Workout) => {
    dispatch(removeWorkout(workout));
  };

  return (
    <>
      <Heading fontWeight="bold" fontSize="lg">
        {wrk.routineName}
      </Heading>
      <Flex direction="column" gap={3} textColor="white">
        <Flex direction="column" gap={3}>
          {wrk.exerciseInstances.map((exerciseInstance, index) => (
            <Link
              key={exerciseInstance.id}
              to={`/workouts/${wrk.id}/exercise-instances/${exerciseInstance.id}`}
            >
              <Card bg="#404040" w="95vw" key={index}>
                <CardBody>
                  <Text color="white" fontWeight="bold" mb={2}>
                    {exerciseInstance.exercise.name}
                  </Text>
                  <Flex color="white" direction="column">
                    {exerciseInstance.series.map((series, index) => (
                      <Flex key={index} gap={10}>
                        <Text flex={0.1}>{index + 1}</Text>
                        <Flex gap={3} flex={0.2}>
                          <Text fontWeight="bold">{series.reps}</Text>
                          <Text>reps</Text>
                        </Flex>
                        <Flex gap={3} flex={0.2}>
                          <Text fontWeight="bold">{series.weight}</Text>
                          <Text>kgs</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </CardBody>
              </Card>
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
    </>
  );
};

export default WorkoutSession;
