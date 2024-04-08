import { useRef } from "react";

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
  Heading,
} from "@chakra-ui/react";

const NewWorkout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <Flex direction="column" gap={6}>
      <Button
        ref={btnRef}
        onClick={onOpen}
        textColor="#353935"
        bg="lightblue"
        w="90vw"
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
              <Flex direction="column" gap={1} textColor="white">
                <Flex direction="column" gap={2}>
                  <Text fontWeight="bold">Full Body 1</Text>
                  <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                    5 EXERCISES
                  </Text>
                </Flex>
                <Text fontSize="sm" color="#E0E0E0">
                  Barbell bench press | Barbell squats | Dumbbell lateral raises
                  | Pulldowns | Leg internal rotation
                </Text>
              </Flex>
              <Flex direction="column" gap={1} textColor="white">
                <Flex direction="column" gap={2}>
                  <Text fontWeight="bold">Full Body 2</Text>
                  <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                    5 EXERCISES
                  </Text>
                </Flex>
                <Text fontSize="sm" color="#E0E0E0">
                  Barbell incline press | Deadlifts | Dumbbell pushes | Barbell
                  rows | Leg external rotation
                </Text>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex justify="center">
        <Heading fontSize="lg">Full Body 1</Heading>
      </Flex>
    </Flex>
  );
};

export default NewWorkout;
