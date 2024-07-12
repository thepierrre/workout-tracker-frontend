import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Workout } from "../../interfaces/workout.interface";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  CardBody,
} from "@chakra-ui/react";
import CustomCard from "../../components/UI/CustomCard";
import { ExerciseInstance } from "interfaces/exerciseInstance.interface";

interface WorkoutProps {
  workout: Workout;
  onRemoveWorkout: (id: string) => void;
}

const WorkoutSession: React.FC<WorkoutProps> = ({
  workout: wrk,
  onRemoveWorkout,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null);
  const [localExerciseInstances, setLocalExerciseInstances] = useState<
    ExerciseInstance[]
  >(wrk.exerciseInstances);

  useEffect(() => {
    setLocalExerciseInstances(wrk.exerciseInstances);
  }, [wrk.exerciseInstances]);

  useEffect(() => {
    return () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
    };
  }, [toast]);

  const handleOpenModal = (workout: Workout) => {
    setWorkoutToDelete(workout);
    onOpen();
  };

  const handleRemoveWorkout = () => {
    if (workoutToDelete) {
      onRemoveWorkout(workoutToDelete.id);
      setWorkoutToDelete(null);
      onClose();
    }
  };

  const addToast = (message: string) => {
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
          <Text textAlign="center">{message}</Text>
        </Box>
      ),
    });
  };

  const handleExInstanceDeleted = (exInstanceId: string) => {
    setLocalExerciseInstances((prevInstances) =>
      prevInstances.filter((instance) => instance.id !== exInstanceId)
    );
    addToast("Exercise deleted from workout");
  };

  const handleAddExercisesButton = () => {
    navigate("/exercises", {
      state: { addExercises: "true", workoutId: wrk.id },
    });
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

      <Flex gap={1} justify="center" color="lightblue">
        <AddCircleOutlineIcon />
        <Text
          textAlign="center"
          fontWeight="bold"
          onClick={() => handleAddExercisesButton()}
        >
          Manage exercises
        </Text>
      </Flex>

      <Flex direction="column" mt={2}>
        {localExerciseInstances.length > 0 ? (
          localExerciseInstances.map((exerciseInstance, index) => (
            <Flex
              key={exerciseInstance.id}
              direction="row"
              justify="center"
              p={1}
              color="lightblue"
            >
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
            </Flex>
          ))
        ) : (
          <Flex mt={2} mb={2}>
            <CustomCard>
              <CardBody p={4}>
                <Text color="white" textAlign="center">
                  This workout has no exercises yet.
                </Text>
              </CardBody>
            </CustomCard>
          </Flex>
        )}
      </Flex>
      <Flex
        gap={1}
        mt={1}
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
  );
};

export default WorkoutSession;
