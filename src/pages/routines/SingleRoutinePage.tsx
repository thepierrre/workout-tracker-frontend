import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  updateRoutine,
  removeRoutine,
} from "../../features/routines/routinesSlice";
import RoutineForm from "../../components/forms/RoutineForm";
import { Exercise } from "../../interfaces/exercise.interface";
import Container from "../../components/UI/Container";
import {
  Flex,
  Heading,
  IconButton,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { Routine } from "../../interfaces/routine.interface";

const SingleRoutinePage = () => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const routines: Routine[] = useSelector(
    (state: RootState) => state.routines.routines
  );
  const currentRoutine: Routine | undefined = routines.find(
    (routine) => routine.id === routineId
  );

  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  if (!currentRoutine) {
    return <Text>Routine not found.</Text>;
  }

  if (!user) {
    return;
  }

  const onSubmit = (data: { name: string }, selectedExercises: Exercise[]) => {
    const currentIndex = routines.indexOf(currentRoutine);

    if (currentIndex !== -1) {
      dispatch(
        updateRoutine({
          id: currentRoutine.id,
          name: data.name,
          exerciseTypes: selectedExercises,
          userId: user.id,
        })
      );
    }
    navigate("/routines");
  };

  const handleRemoveRoutine = (routine: Routine) => {
    dispatch(removeRoutine(routine.id));
    navigate("/routines");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Flex align="center" w="100%" mb={3}>
        <IconButton
          aria-label="Go back"
          variant="link"
          color="white"
          w="15%"
          icon={<ChevronLeftIcon boxSize={8} />}
          onClick={() => handleGoBack()}
        />

        <Heading w="70%" fontSize="lg" textAlign="center">
          Edit routine
        </Heading>
        <Box w="16%" />
      </Flex>
      <RoutineForm
        initialName={currentRoutine.name}
        initialSelectedExercises={currentRoutine.exerciseTypes}
        onSubmit={onSubmit}
        buttonText="Update"
        serverError={serverError}
      ></RoutineForm>
      <Flex gap={1} justify="center" color="lightblue" onClick={onOpen} mt={3}>
        <RemoveCircleOutlineIcon />
        <Text fontWeight="bold">Delete routine</Text>
      </Flex>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pt={3} pb={3}>
          <ModalHeader textAlign="center">Delete routine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="center">
              Do you really want to delete this routine?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleRemoveRoutine(currentRoutine)}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SingleRoutinePage;
