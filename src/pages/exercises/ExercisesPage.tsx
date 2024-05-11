import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WideButton from "../../components/UI/WideButton";
import Container from "../../components/UI/Container";

import { Flex, Text } from "@chakra-ui/react";
import SingleExercise from "../../components/exercises/SingleExercise";

const ExercisesPage = () => {
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  return (
    <Container>
      <Link to="/exercises/new-exercise">
        <WideButton type="submit">New exercise</WideButton>
      </Link>
      <Flex direction="column" gap={2} w="100%">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Link key={exercise.id} to={`/exercises/${exercise.id}`}>
              <SingleExercise key={index} exercise={exercise} />
            </Link>
          ))
        ) : (
          <Text textAlign="center">You don't have any exercises yet.</Text>
        )}
      </Flex>
    </Container>
  );
};

export default ExercisesPage;
