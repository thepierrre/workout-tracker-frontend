import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  ToastId,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import WideButton from "../../components/UI/WideButton";
import SingleExercise from "../../components/exercises/SingleExercise";
import { fetchExercises } from "../../features/exercises/exercisesSlice";
import { fetchWorkouts } from "../../features/workout/workoutSessionsSlice";
import useCustomToast from "../../hooks/useCustomToast";
import { Exercise } from "../../interfaces/exercise.interface";

const ExercisesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { addToast, toastIdRef, closeToast } = useCustomToast();
  //const toastIdRef = useRef<ToastId | undefined>(undefined);
  const [searchedExercises, setSearchedExercises] = useState<string>("");
  const [currentWorkoutExercisesNames, setCurrentWorkoutExercisesNames] =
    useState<string[]>([]);
  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises,
  );
  const { workouts, loading: loadingWorkouts } = useSelector(
    (state: RootState) => state.workoutSessions,
  );

  const workoutId = location.state?.workoutId || null;

  useEffect(() => {
    if (location.state && location.state.workoutId) {
      const currentWorkout = workouts.find(
        (wrk) => wrk.id === location.state.workoutId,
      );

      if (currentWorkout) {
        const exerciseNames = currentWorkout.exerciseInstances.map(
          (ex) => ex.exerciseTypeName,
        );
        setCurrentWorkoutExercisesNames(exerciseNames);
      }
    }
  }, [location.state, workouts]);

  useEffect(() => {
    dispatch(fetchExercises());
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    handleToast();

    return () => {
      closeToast();
    };
  }, [location.state]);

  const handleToastText = (): string => {
    if (location.state) {
      if (location.state.exercise === "removed") {
        return "Exercise deleted";
      } else if (location.state.exercise === "created") {
        return "Exercise created";
      } else if (location.state.exercise === "updated") {
        return "Exercise updated";
      }
    }
    return "";
  };

  const handleToast = () => {
    if (
      location.state &&
      ["removed", "created", "updated"].includes(location.state.exercise)
    ) {
      addToast({ message: handleToastText(), bg: "#2F855A" });
    }
  };

  const filteredExercises = exercises.filter((exercise: Exercise) =>
    exercise?.name?.toLowerCase().startsWith(searchedExercises.toLowerCase()),
  );

  const handleExerciseFiltering = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setSearchedExercises(value);
  };

  if (loadingExercises || loadingWorkouts) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
      <Link to="/exercises/new-exercise">
        <WideButton w={["95vw", "85vw", "70vw", "50vw", "40vw"]} type="submit">
          New exercise
        </WideButton>
      </Link>

      <Flex w={["95vw", "85vw", "70vw", "50vw", "40vw"]}>
        <InputGroup mt={3}>
          <Input
            w="95vw"
            bg="#404040"
            color="white"
            borderColor="#CBD5E0"
            _focus={{
              borderWidth: "1px",
              borderColor: "#3182CE",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Search for exercises"
            onChange={(event) => handleExerciseFiltering(event)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </Flex>

      <Flex direction="column" gap={2} align="center" mt={2}>
        {filteredExercises && filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) =>
            exercise.isDefault === false ? (
              <Link key={exercise.name} to={`/exercises/${exercise.id}`}>
                <SingleExercise
                  key={exercise.id}
                  exercise={exercise}
                  setCurrentWorkoutExercisesNames={
                    setCurrentWorkoutExercisesNames
                  }
                  workoutId={workoutId}
                  currentWorkoutExercisesNames={currentWorkoutExercisesNames}
                />
              </Link>
            ) : (
              <SingleExercise
                key={exercise.id}
                exercise={exercise}
                setCurrentWorkoutExercisesNames={
                  setCurrentWorkoutExercisesNames
                }
                workoutId={workoutId}
                currentWorkoutExercisesNames={currentWorkoutExercisesNames}
              />
            ),
          )
        ) : (
          <Text textAlign="center" mt={5}>
            No exercises.
          </Text>
        )}
      </Flex>
    </Container>
  );
};

export default ExercisesPage;
