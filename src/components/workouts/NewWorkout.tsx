import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import { addWorkout } from "../../features/workout/workoutSessionsSlice";
import { Routine } from "../../interfaces/routine.interface";
import { Workout } from "../../interfaces/workout.interface";
import WideButton from "../UI/WideButton";

const NewWorkout = () => {
  const [workoutAddingInProgress, setWorkoutAddingInProgress] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);
  const [day, month, year] = chosenDay.split("/").map(Number);
  const chosenDayAsDate = new Date(year, month - 1, day);
  const routines = useSelector((state: RootState) => state.routines.routines);

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  const handleAddWorkout = async (routine: Routine) => {
    try {
      setWorkoutAddingInProgress(true);
      const workoutToAdd: Omit<Workout, "id" | "exerciseInstances"> = {
        routineName: routine.name,
        creationDate: format(chosenDayAsDate, "yyyy-MM-dd"),
      };
      onClose();
      await dispatch(addWorkout(workoutToAdd));
      setWorkoutAddingInProgress(false);
    } catch (error) {
      setWorkoutAddingInProgress(false);
      console.log(error);
    }
  };

  return (
    <Flex direction="column" gap={6}>
      <WideButton
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        ref={btnRef}
        onClick={onOpen}
      >
        New workout
      </WideButton>
      {workoutAddingInProgress && (
        <Flex justify="center">
          <Spinner />
        </Flex>
      )}
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopRadius={10}
          height="50vh"
          bg="#404040"
          w={["100vw", "100vw", "70vw", "65vw", "65vw"]}
          margin="0 auto"
        >
          <DrawerHeader textColor="white" textAlign="center" fontSize="2xl">
            Select a routine
          </DrawerHeader>
          <DrawerBody>
            {routines?.length === 0 ? (
              <Flex align="center" direction="column" mt={5}>
                <Text color="white" fontSize="md" textAlign="center">
                  No routines yet.
                </Text>
                <Link to="/routines/new-routine">
                  <Text
                    color="lightblue"
                    fontSize="md"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Add your first one!
                  </Text>
                </Link>
              </Flex>
            ) : (
              <Flex direction="column" gap={7} bg="#404040">
                {routines?.map((routine, index) => (
                  <Box key={index} onClick={() => handleAddWorkout(routine)}>
                    <Flex direction="column" gap={1} textColor="white">
                      <Flex direction="column" gap={2}>
                        <Text fontWeight="bold">{routine?.name}</Text>
                        <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                          {routine?.routineExercises?.length} EXERCISES
                        </Text>
                      </Flex>
                      <Text fontSize="sm" color="#E0E0E0">
                        {routine?.routineExercises?.map((exercise, index) => (
                          <Fragment key={index}>
                            {index > 0 && " | "} {exercise?.name}
                          </Fragment>
                        ))}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NewWorkout;
