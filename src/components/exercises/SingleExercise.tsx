import CustomCard from "../UI/CustomCard";
import { CardBody, Text, Flex } from "@chakra-ui/react";
import { Exercise } from "../../interfaces/exercise.interface";

interface Props {
  exercise: Exercise;
}

const SingleExercise: React.FC<Props> = ({ exercise }) => {
  return (
    <CustomCard>
      <CardBody>
        <Flex direction="column" gap={1} textColor="white">
          <Flex direction="column" gap={1}>
            <Text
              fontWeight="bold"
              data-testid={`exercise-name-${exercise.id}`}
            >
              {exercise.name}
            </Text>
            <Text
              fontWeight="bold"
              fontSize="xs"
              color="#E0E0E0"
              data-testid={`exercise-categories-${exercise.id}`}
            >
              {exercise.categories
                .map((category) => category?.name)
                .join(" | ")
                .toUpperCase()}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </CustomCard>
  );
};

export default SingleExercise;
