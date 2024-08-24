import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  ToastId,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import WideButton from "../../components/UI/buttons/WideButton";
import SingleRoutine from "../../components/routines/SingleRoutine";
import { fetchRoutines } from "../../store/routines/routinesSlice";

const RoutinesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const [searchedRoutines, setSearchedRoutines] = useState<string>("");
  const { routines, loading: loadingRoutines } = useSelector(
    (state: RootState) => state.routines,
  );

  // useEffect(() => {
  //   dispatch(fetchRoutines());
  // }, [dispatch]);

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
    routine.name.toLowerCase().startsWith(searchedRoutines.toLowerCase()),
  );

  const handleRoutineFiltering = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setSearchedRoutines(value);
  };

  // if (loadingRoutines) {
  //   return <SpinnerComponent />;
  // }

  return (
    <Container>
      <Link to="/routines/new-routine">
        <WideButton w={["95vw", "85vw", "70vw", "50vw", "40vw"]} type="submit">
          Add routine
        </WideButton>
      </Link>

      <Flex>
        <InputGroup mt={3}>
          <Input
            id="search-routines"
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            bg="#404040"
            color="white"
            borderColor="#CBD5E0"
            _focus={{
              borderWidth: "1px",
              borderColor: "#3182CE",
            }}
            _placeholder={{
              color: "#B3B3B3",
            }}
            placeholder="Search for routines"
            onChange={(event) => handleRoutineFiltering(event)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </Flex>

      {loadingRoutines && routines.length === 0 ? (
        <SpinnerComponent text="Loading routines..." mt={4} />
      ) : (
        <Flex direction="column" gap={2} w="95vw" align="center" mt={2}>
          {filteredRoutines.length > 0 ? (
            filteredRoutines?.map((routine) => (
              <Link to={`/routines/${routine.id}`} key={routine.id}>
                <SingleRoutine key={routine.id} routine={routine} />
              </Link>
            ))
          ) : (
            <Text mt={5}>You have no routines yet.</Text>
          )}
        </Flex>
      )}

      {/* <Flex direction="column" gap={2} w="95vw" align="center" mt={2}>
        {filteredRoutines.length > 0 ? (
          filteredRoutines?.map((routine) => (
            <Link to={`/routines/${routine.id}`} key={routine.id}>
              <SingleRoutine key={routine.id} routine={routine} />
            </Link>
          ))
        ) : (
          <Text mt={5}>You have no routines yet.</Text>
        )}
      </Flex> */}
    </Container>
  );
};

export default RoutinesPage;
