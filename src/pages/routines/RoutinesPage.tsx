import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import WideButton from "../../components/UI/WideButton";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import SingleRoutine from "../../components/routines/SingleRoutine";
import Container from "../../components/UI/Container";
import { SearchIcon } from "@chakra-ui/icons";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import {
  Flex,
  Text,
  useToast,
  ToastId,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const RoutinesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const [searchedRoutines, setSearchedRoutines] = useState<string>("");
  const { routines, loading: loadingRoutines } = useSelector(
    (state: RootState) => state.routines
  );

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

  const filteredRoutines = routines.filter((routine) =>
    routine.name.toLowerCase().startsWith(searchedRoutines.toLowerCase())
  );

  const handleRoutineFiltering = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchedRoutines(value);
  };

  if (loadingRoutines) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <Link to="/routines/new-routine">
        <WideButton type="submit">New routine</WideButton>
      </Link>

      <Flex>
        <InputGroup mt={3}>
          <Input
            w="95vw"
            bg="#404040"
            color="white"
            borderColor="transparent"
            _focusVisible={{
              borderWidth: "1px",
              borderColor: "lightblue",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Search routines"
            onChange={(event) => handleRoutineFiltering(event)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </Flex>

      <Flex direction="column" gap={2} w="95vw" align="center" mt={2}>
        {filteredRoutines.length > 0 ? (
          filteredRoutines?.map((routine) => (
            <Link to={`/routines/${routine.id}`} key={routine.id}>
              <SingleRoutine key={routine.id} routine={routine} />
            </Link>
          ))
        ) : (
          <Text mt={5}>No routines.</Text>
        )}
      </Flex>
    </Container>
  );
};

export default RoutinesPage;
