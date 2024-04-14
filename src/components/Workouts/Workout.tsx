import { NavLink } from "react-router-dom";

import { routines } from "../../util/DUMMY_DATA";

import { Card, CardBody, Flex, Text, Heading } from "@chakra-ui/react";

type Series = {
  reps: number;
  weight: number;
};

type Exercise = Series[];

type FormValues = Exercise[];

const Workout = () => {
  return (
    <>
      <NavLink to="/workouts/exercise">
        {/* <WorkoutExerciseCard /> */}

        <Card bg="#404040" w="95vw">
          <CardBody>
            <Flex direction="column" gap={3} textColor="white">
              <Text fontWeight="bold"></Text>
              <Flex direction="column" gap={3}>
                <Flex gap={10}>
                  <Text fontWeight="bold">1</Text>
                  <Flex gap={1}>
                    <Text fontWeight="bold">10</Text>
                    <Text textColor="#C2C2C2">reps</Text>
                  </Flex>
                  <Flex gap={1}>
                    <Text fontWeight="bold">35</Text>
                    <Text textColor="#C2C2C2">kgs</Text>
                  </Flex>
                </Flex>
                <Flex gap={10}>
                  <Text fontWeight="bold">2</Text>
                  <Flex gap={1}>
                    <Text fontWeight="bold">10</Text>
                    <Text textColor="#C2C2C2">reps</Text>
                  </Flex>
                  <Flex gap={1}>
                    <Text fontWeight="bold">35</Text>
                    <Text textColor="#C2C2C2">kgs</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </NavLink>
    </>
  );
};

export default Workout;
