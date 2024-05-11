import { useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Routine } from "../../interfaces/routine.interface";
import WideButton from "../UI/WideButton";
import { Workout } from "../../interfaces/workout.interface";
import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";
import { generateRandomString } from "../../util/DUMMY_DATA";
import { addWorkout } from "../../features/workout/workoutSessionsSlice";
import { RootState } from "../../app/store";

import { routines } from "../../util/DUMMY_DATA";

import {
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  Box,
} from "@chakra-ui/react";

const NewWorkout = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);
  const [day, month, year] = chosenDay.split("/").map(Number);
  const chosenDayAsDate = new Date(year, month - 1, day).toString();

  const handleAddWorkout = (routine: Routine) => {
    const exerciseInstances: ExerciseInstance[] = routine.exercises.map(
      (exercise) => ({
        id: generateRandomString(5),
        exercise: exercise,
        series: Array.from({ length: 3 }, () => ({
          id: generateRandomString(5),
          reps: 0,
          weight: 0,
        })),
      })
    );

    const workout: Workout = {
      id: generateRandomString(5),
      creationDate: chosenDayAsDate,
      routineName: routine.name,
      exerciseInstances,
    };

    dispatch(addWorkout(workout));
    onClose();
  };

  return (
    <Flex direction="column" gap={6}>
      <WideButton ref={btnRef} onClick={onOpen}>
        New workout
      </WideButton>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent height="50vh" bg="#404040">
          <DrawerHeader textColor="white" textAlign="center">
            Select a routine
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={7} bg="#404040">
              {routines.map((routine, index) => (
                <Box key={index} onClick={() => handleAddWorkout(routine)}>
                  <Flex direction="column" gap={1} textColor="white">
                    <Flex direction="column" gap={2}>
                      <Text fontWeight="bold">{routine.name}</Text>
                      <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                        {routine.exercises.length} EXERCISES
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="#E0E0E0">
                      {routine.exercises.map((exercise, index) => (
                        <Fragment key={index}>
                          {index > 0 && " | "} {exercise.name}
                        </Fragment>
                      ))}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NewWorkout;
