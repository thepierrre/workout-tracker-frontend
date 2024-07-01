import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";
import CustomCard from "../UI/CustomCard";
import { CardBody, Text, Flex } from "@chakra-ui/react";

interface Props {
  exerciseInstance: ExerciseInstance;
}

const WorkoutExerciseInstance: React.FC<Props> = ({ exerciseInstance }) => {
  return (
    <CustomCard>
      <CardBody>
        <Text color="white" fontWeight="bold" mb={2}>
          {exerciseInstance?.exerciseTypeName}
        </Text>
        <Flex color="white" direction="column">
          {exerciseInstance?.workingSets?.map((workingSet, index) => (
            <Flex key={index} gap={10}>
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
          ))}
        </Flex>
      </CardBody>
    </CustomCard>
  );
};

export default WorkoutExerciseInstance;
