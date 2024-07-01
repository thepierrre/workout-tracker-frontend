import { useState } from "react";
import { Link } from "react-router-dom";
import { Workout } from "../../interfaces/workout.interface";
import { useDispatch } from "react-redux";
import { removeWorkout } from "../../features/workout/workoutSessionsSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import WorkoutExerciseInstance from "./WorkoutExerciseInstance";
import DeletionModal from "../../components/UI/DeletionModal";

import { Flex, Text, Heading, useDisclosure } from "@chakra-ui/react";
import { AppDispatch } from "../../app/store";

interface WorkoutProps {
  workout: Workout;
  onWorkoutDeleted: () => void;
}

const WorkoutSession: React.FC<WorkoutProps> = ({
  workout: wrk,
  onWorkoutDeleted,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null);

  const handleOpenModal = (workout: Workout) => {
    setWorkoutToDelete(workout);
    onOpen();
  };

  const handleRemoveWorkout = () => {
    if (workoutToDelete) {
      dispatch(removeWorkout(workoutToDelete.id));
      onWorkoutDeleted();
      setWorkoutToDelete(null);
      onClose();
    }
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
          onClick={() => handleOpenModal(wrk)}
        >
          <RemoveCircleOutlineIcon />
          <Text fontWeight="bold">Delete workout</Text>
          <DeletionModal
            isOpen={isOpen}
            onClose={onClose}
            onDelete={handleRemoveWorkout}
            elementType="workout"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorkoutSession;
