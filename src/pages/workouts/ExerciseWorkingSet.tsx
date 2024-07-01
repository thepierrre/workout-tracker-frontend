import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { WorkingSet } from "interfaces/workingSet.interface";

interface ExerciseWorkingSetProps {
  workingSet: WorkingSet;
  activeWorkingSet?: WorkingSet;
  index: number;
  handleActiveExInstance: (workingSet: WorkingSet) => void;
}

const ExerciseWorkingSet: React.FC<ExerciseWorkingSetProps> = ({
  workingSet,
  activeWorkingSet,
  index,
  handleActiveExInstance,
}) => {
  return (
    <Card
      bg={
        activeWorkingSet && activeWorkingSet.id === workingSet.id
          ? "lightblue"
          : "#404040"
      }
      w="95vw"
      key={index}
      onClick={() => workingSet && handleActiveExInstance(workingSet)}
    >
      <CardBody p={4}>
        <Flex
          key={index}
          gap={10}
          color={
            activeWorkingSet && activeWorkingSet.id === workingSet.id
              ? "#353935"
              : "white"
          }
        >
          <Text flex={0.1}>{index + 1}</Text>
          <Flex gap={3} flex={0.2}>
            <Text fontWeight="bold">{workingSet.reps}</Text>
            <Text>reps</Text>
          </Flex>
          <Flex gap={3} flex={0.2}>
            <Text fontWeight="bold">{workingSet.weight}</Text>
            <Text>kgs</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ExerciseWorkingSet;
