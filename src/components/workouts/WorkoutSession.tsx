import {
  Box,
  CardBody,
  Flex,
  Heading,
  Text,
  ToastId,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ExerciseInstance } from "interfaces/exerciseInstance.interface";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import CustomCard from "../../components/UI/CustomCard";
import DeletionModal from "../../components/UI/DeletionModal";
import { fetchUserSettings } from "../../features/settings/userSettingsSlice";
import { UserSettings } from "../../interfaces/userSettings.interface";
import { Workout } from "../../interfaces/workout.interface";
import WorkoutExerciseInstance from "./WorkoutExerciseInstance";

const defaultUserSettings: UserSettings = {
  changeThreshold: 1,
  weightUnit: "kgs",
};

interface WorkoutProps {
  workout: Workout;
  onRemoveWorkout: (id: string) => void;
}

const WorkoutSession: React.FC<WorkoutProps> = ({
  workout: wrk,
  onRemoveWorkout,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null);
  const [localExerciseInstances, setLocalExerciseInstances] = useState<
    ExerciseInstance[]
  >(wrk?.exerciseInstances);

  const userSettings =
    useSelector((state: RootState) => state.userSettings?.userSettings) ||
    defaultUserSettings;

  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

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
      prevInstances.filter((instance) => instance.id !== exInstanceId),
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

      <Flex color="lightblue" fontWeight="bold" gap={1} justify="center">
        <AddCircleOutlineIcon />
        <Text textAlign="center" onClick={() => handleAddExercisesButton()}>
          Edit exercises
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
                  userSettings={userSettings || defaultUserSettings}
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
        <Text fontWeight="bold" data-testid="delete-workout-button">
          Delete workout
        </Text>
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
