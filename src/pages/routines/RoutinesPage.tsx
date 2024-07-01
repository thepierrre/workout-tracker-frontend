import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import WideButton from "../../components/UI/WideButton";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import SingleRoutine from "../../components/routines/SingleRoutine";
import Container from "../../components/UI/Container";
import { Link, useLocation } from "react-router-dom";
import { Flex, Text, useToast, ToastId, Box } from "@chakra-ui/react";

const RoutinesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const routines = useSelector((state: RootState) => state.routines.routines);

  useEffect(() => {
    dispatch(fetchRoutines());
  }, [dispatch]);

  useEffect(() => {
    handleToast();
  }, [location.state]);

  useEffect(() => {
    return () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
    };
  }, [location, toast]);

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
          <Text textAlign="center">{handleToastText()}</Text>
        </Box>
      ),
    });
  };

  const handleToastText = () => {
    if (location.state) {
      if (location.state.routine === "removed") {
        return "Routine deleted";
      } else if (location.state.routine === "created") {
        return "Routine created";
      } else if (location.state.routine === "updated") {
        return "Routine updated";
      }
    }
  };

  const handleToast = () => {
    if (
      location.state &&
      ["removed", "created", "updated"].includes(location.state.routine)
    ) {
      addToast();
    }
  };

  return (
    <Container>
      <Link to="/routines/new-routine">
        <WideButton type="submit">New routine</WideButton>
      </Link>
      <Flex direction="column" gap={2} w="95vw" align="center" mt={3}>
        {routines.length > 0 ? (
          routines?.map((routine) => (
            <Link to={`/routines/${routine.id}`} key={routine.id}>
              <SingleRoutine key={routine.id} routine={routine} />
            </Link>
          ))
        ) : (
          <Text mt={5}>No routines yet. Add your first one!</Text>
        )}
      </Flex>
    </Container>
  );
};

export default RoutinesPage;
