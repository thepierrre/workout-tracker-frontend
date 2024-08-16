import { CardBody, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { Exercise } from "../../interfaces/exercise.interface";
import { Routine } from "../../interfaces/routine.interface";
import CustomCard from "../UI/CustomCard";

interface Props {
  routine: Routine;
}

const SingleRoutine: React.FC<Props> = ({ routine }) => {
  return (
    <CustomCard>
      <CardBody>
        <Flex direction="column" gap={1} textColor="white">
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold" data-testid={`routine-name-${routine.id}`}>
              {routine.name}
            </Text>
            <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
              {routine.routineExercises?.length}{" "}
              {routine.routineExercises?.length === 1
                ? "EXERCISE"
                : "EXERCISES"}
            </Text>
          </Flex>
          <Text
            fontSize="sm"
            color="#E0E0E0"
            data-testid={`routine-exercises-${routine.id}`}
          >
            {routine.routineExercises
              ?.map((exercise: Exercise) => exercise?.name.trim())
              .join(" | ")}
          </Text>
        </Flex>
      </CardBody>
    </CustomCard>
  );
};

export default SingleRoutine;
