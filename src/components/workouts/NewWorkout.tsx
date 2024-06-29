import { useEffect } from "react";
import { useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routine } from "../../interfaces/routine.interface";
import { Link } from "react-router-dom";
import WideButton from "../UI/WideButton";
import { Workout } from "../../interfaces/workout.interface";
import { addWorkout } from "../../features/workout/workoutSessionsSlice";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import { RootState, AppDispatch } from "../../app/store";
import { format } from "date-fns";

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

  const handleAddWorkout = (routine: Routine) => {
    const workoutToAdd: Omit<Workout, "id" | "exerciseInstances"> = {
      routineName: routine.name,
      creationDate: format(chosenDayAsDate, "yyyy-MM-dd"),
    };

    dispatch(addWorkout(workoutToAdd));
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
          <DrawerHeader textColor="white" textAlign="center" fontSize="2xl">
            Select a routine
          </DrawerHeader>
          <DrawerBody>
            {routines?.length === 0 ? (
              <Flex align="center" direction="column" mt={10}>
                <Text color="white" fontSize="lg" textAlign="center">
                  No routines yet.
                </Text>
                <Link to="/routines/new-routine">
                  <Text
                    color="lightblue"
                    fontSize="lg"
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
                          {routine?.exerciseTypes?.length} EXERCISES
                        </Text>
                      </Flex>
                      <Text fontSize="sm" color="#E0E0E0">
                        {routine?.exerciseTypes?.map((exercise, index) => (
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
