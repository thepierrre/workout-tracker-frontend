import { useRef, Fragment } from "react";
import { useDispatch } from "react-redux";
// import { setChosenRoutine } from "../../features/workout/currentWorkoutSlice";

import { Routine } from "../../interfaces/routine.interface";

import { routines } from "../../util/DUMMY_DATA";

import {
  Flex,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";

const NewWorkout = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  //   const handleChosenRoutine = (routine: Routine) => {
  //     console.log(routine);
  //     dispatch(setChosenRoutine(routine));
  //   };

  return (
    <Flex direction="column" gap={6}>
      <Button
        ref={btnRef}
        onClick={onOpen}
        textColor="#353935"
        bg="lightblue"
        w="95vw"
      >
        New workout
      </Button>
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
            <Flex direction="column" gap={7}>
              {routines.map((routine, index) => (
                <Card
                  key={index}
                  bg="#404040"
                  //   onClick={() => handleChosenRoutine(routine)}
                >
                  <CardBody>
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
                  </CardBody>
                </Card>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NewWorkout;
