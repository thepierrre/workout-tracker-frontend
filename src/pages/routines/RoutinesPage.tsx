import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WideButton from "../../components/UI/WideButton";
import SingleRoutine from "../../components/routines/SingleRoutine";
import Container from "../../components/UI/Container";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

const RoutinesPage = () => {
  const routines = useSelector((state: RootState) => state.routines.routines);

  return (
    <Container>
      <Link to="/routines/new-routine">
        <WideButton type="submit">New routine</WideButton>
      </Link>
      <Flex direction="column" gap={2} w="95vw" align="center" mt={3}>
        {routines.length > 0 ? (
          routines.map((routine) => (
            <Link to={`/routines/${routine.id}`} key={routine.id}>
              <SingleRoutine key={routine.id} routine={routine} />
            </Link>
          ))
        ) : (
          <Text mt={5}>You don't have any routines yet.</Text>
        )}
      </Flex>
    </Container>
  );
};

export default RoutinesPage;
