import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "../../util/axiosInstance";
import WideButton from "../../components/UI/WideButton";
import SingleRoutine from "../../components/routines/SingleRoutine";
import Container from "../../components/UI/Container";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

const RoutinesPage = () => {
  const routines = useSelector((state: RootState) => state.routines.routines);

  useEffect(() => {
    const getRoutines = async () => {
      try {
        const response = await axios.get("users");
        console.log(response);
      } catch {
        // empty on purpose
      }
    };
    getRoutines();
  }, []);

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
          <Text>You don't have any routines yet.</Text>
        )}
      </Flex>
    </Container>
  );
};

export default RoutinesPage;
