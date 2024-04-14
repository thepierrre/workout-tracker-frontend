import NewRoutine from "../components/routines/NewRoutine";

import { routines } from "../util/DUMMY_DATA";

import { Fragment } from "react/jsx-runtime";

import { Flex, Text, Card, CardBody } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const numOfExercises = routines.length;

const RoutinesPage = () => {
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
      <Flex direction="column" gap={2} w="100%">
        {routines.map((routine, index) => (
          <Card key={index} bg="#404040">
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
                    <Fragment key={index}>
                      {index > 0 && " | "} {exercise.name}
                    </Fragment>
                  ))}
                </Text>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Flex>
      <NewRoutine />
    </Flex>
  );
};

export default RoutinesPage;
