import { Fragment } from "react/jsx-runtime";
import CustomCard from "../UI/CustomCard";
import { CardBody, Flex, Text } from "@chakra-ui/react";
import { Routine } from "../../interfaces/routine.interface";
import React from "react";

interface Props {
  routine: Routine;
}

const SingleRoutine: React.FC<Props> = ({ routine }) => {
  return (
    <CustomCard>
      <CardBody>
        <Flex direction="column" gap={1} textColor="white">
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">{routine.name}</Text>
            <Text fontWeight="bold" fontSize="xs" color="#E0E0E0">
              {routine.exercises?.length}{" "}
              {routine.exercises?.length === 1 ? "EXERCISE" : "EXERCISES"}
            </Text>
          </Flex>
          <Text fontSize="sm" color="#E0E0E0">
            {routine.exercises?.map((exercise, index) => (
              <Fragment key={exercise.id}>
                {index > 0 && " | "} {exercise.name}
              </Fragment>
            ))}
          </Text>
        </Flex>
      </CardBody>
    </CustomCard>
  );
};

export default SingleRoutine;
