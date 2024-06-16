import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchExercises } from "../../features/exercises/exercisesSlice";
import WideButton from "../../components/UI/WideButton";
import Container from "../../components/UI/Container";

import { Flex, Text } from "@chakra-ui/react";
import SingleExercise from "../../components/exercises/SingleExercise";

const ExercisesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  return (
    <Container>
      <Link to="/exercises/new-exercise">
        <WideButton type="submit">New exercise</WideButton>
      </Link>
      <Flex direction="column" gap={2} w="95vw" align="center" mt={3}>
        {exercises && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <Link key={exercise.id} to={`/exercises/${exercise.id}`}>
              <SingleExercise exercise={exercise} />
            </Link>
          ))
        ) : (
          <Text textAlign="center" mt={5}>
            You don't have any exercises yet.
          </Text>
        )}
      </Flex>
    </Container>
  );
};

export default ExercisesPage;
