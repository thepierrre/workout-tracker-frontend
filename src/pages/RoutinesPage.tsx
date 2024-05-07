import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "../util/axiosInstance";

import { Link } from "react-router-dom";

import { Fragment } from "react/jsx-runtime";

import { Flex, Text, Card, CardBody, Button } from "@chakra-ui/react";

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
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
      marginTop={8}
    >
      <Link to="/routines/new-routine">
        <Button w="95vw" bg="lightblue" textColor="#353935" type="submit">
          New routine
        </Button>
      </Link>
      <Flex direction="column" gap={2} w="100%" align="center">
        {routines.length > 0 ? (
          routines.map((routine) => (
            <Link to={`/routines/${routine.id}`} key={routine.id}>
              <Card bg="#404040">
                <CardBody>
                  <Flex direction="column" gap={1} textColor="white">
                    <Flex direction="column" gap={2}>
                      <Text fontWeight="bold">{routine.name}</Text>
                      <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
                        {routine.exercises.length} EXERCISES
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="#E0E0E0">
                      {routine.exercises.map((exercise, index) => (
                        <Fragment key={exercise.id}>
                          {index > 0 && " | "} {exercise.name}
                        </Fragment>
                      ))}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </Link>
          ))
        ) : (
          <Text>You don't have any routines yet.</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default RoutinesPage;
