import { useRef } from "react";
import { useForm, Resolver } from "react-hook-form";

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
} from "@chakra-ui/react";

const NewExercise = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  type FormValues = {
    name: string;
    categories: string[];
  };

  return (
    <Flex>
      <Button
        ref={btnRef}
        onClick={onOpen}
        textColor="#353935"
        bg="lightblue"
        w="90vw"
      >
        Add exercise
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
            Add a new exercise
          </DrawerHeader>
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NewExercise;
