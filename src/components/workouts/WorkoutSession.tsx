import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Workout } from "../../interfaces/workout.interface";
import { useDispatch } from "react-redux";
import { removeWorkout } from "../../features/workout/workoutSessionsSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import WorkoutExerciseInstance from "./WorkoutExerciseInstance";
import DeletionModal from "../../components/UI/DeletionModal";

import {
  Flex,
  Text,
  Heading,
  useDisclosure,
  useToast,
  ToastId,
  Box,
} from "@chakra-ui/react";
import { AppDispatch } from "../../app/store";

interface WorkoutProps {
  workout: Workout;
  onWorkoutDeleted: () => void;
}

const WorkoutSession: React.FC<WorkoutProps> = ({
  workout: wrk,
  onWorkoutDeleted,
}) => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null);

  useEffect(() => {
    return () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
    };
  }, [location, toast]);

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
          <Text textAlign="center">Exercise deleted from workout</Text>
        </Box>
      ),
    });
  };

  const handleExInstanceDeleted = () => {
    addToast();
  };

  return (
    <Flex
      direction="column"
      m={2}
      sx={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
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
                onExInstanceDeleted={handleExInstanceDeleted}
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
